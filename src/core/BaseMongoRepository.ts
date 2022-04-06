import { Config } from '@/config/Config'
import { Container } from '@/container/Container'
import { Filter, MongoClient, ObjectId, OptionalId, OptionalUnlessRequiredId, WithId } from 'mongodb'
import { inject } from 'tsyringe'

export abstract class BaseMongoRepository<Entity> {
  abstract collectionName: string

  constructor(
    @inject(MongoClient)
    private client: MongoClient
  ) {}

  protected collection() {
    return this.collectionQueryBuilder(this.collectionName)
  }

  protected collectionQueryBuilder(name: string) {
    return this.client
      .db()
      .collection<Entity>(name)
  }

  protected async findOne(id: string): Promise<WithId<Entity> | null> {
    if (!ObjectId.isValid(id)) {
      return null
    }
    
    const filters = [{ _id: new ObjectId(id) }] as Filter<Entity>

    return await this.collection().findOne(filters)
  }

  protected async insertOne(entity: Entity): Promise<WithId<Entity>> {
    const creationDate = new Date()

    const data = {
      ...entity,
      createdAt: creationDate,
      updatedAt: creationDate,
    }

    const response = await this.collection().insertOne(data)

    const record = response?.ops?.[0]
    
    if (!record) {
      throw new Error('error_creating_record')
    }

    return record
  }

  protected async updateOne(id: string, entity: Partial<Entity>): Promise<WithId<Entity>> {
    const collection = await this.getCollection()
    
    const query = {
      _id: new ObjectId(id),
    } as FilterQuery<Entity>

    const update = {
      $set: {
        ...entity,
        updatedAt: new Date(),
      }
    }

    const options: FindOneAndUpdateOption<Entity> = {
      returnDocument: 'after',
    }

    return collection.findOneAndUpdate(query, update, options) as unknown as WithId<Entity>
  }
}
