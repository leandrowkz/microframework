import { Consumer, Producer, Kafka } from 'kafkajs'
import { Config } from '@/config/Config'
import { Container } from '@/container/Container'

export abstract class BaseEvent<Message> {
  abstract queue: string
  private enabled: boolean
  private client: Kafka
  private consumer: Consumer
  private producer: Producer

  constructor() {
    const config = Container.resolve<Config>(Config)
    const { enabled, brokers, clientId, groupId } = config.kafka
    
    this.client = new Kafka({ brokers, clientId })
    this.producer = this.client.producer()
    this.consumer = this.client.consumer({ groupId })
    this.enabled = enabled
  }

  async dispatch(message: Message): Promise<void> {
    if (!this.enabled) {
      return
    }

    await this.producer.connect()
    await this.producer.send({
      topic: this.queue,
      messages: [{ value: JSON.stringify(message) }],
    })
  }

  async listen(callback: (message: Message) => void): Promise<void> {
    if (!this.enabled) {
      return
    }
    
    await this.consumer.connect()
    await this.consumer.subscribe({
      topic: this.queue,
      fromBeginning: true,
    })

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          const param = JSON.parse(message.value.toString()) as Message
          callback(param)
        }
      }
    })
  }
}
