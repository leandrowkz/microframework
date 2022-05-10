import { Filter, ObjectId, WithId } from 'mongodb'
import { Container } from '@/container/Container'
import { MongoClient } from '@/database/clients/MongoClient'

export abstract class BaseMongoRepository<Entity> {
  abstract collectionName: string
  private client: MongoClient

  constructor() {
    this.client = Container.resolve(MongoClient)
  }

  protected collection() {
    return this.collectionQueryBuilder(this.collectionName)
  }

  protected collectionQueryBuilder(name: string) {
    return this.client
      .db()
      .collection(name)
  }

  protected async findOne(id: string): Promise<WithId<Entity> | null> {
    if (!ObjectId.isValid(id)) {
      return null
    }

    const filters = [{ _id: new ObjectId(id) }] as Filter<Entity>

    return await this.collection().findOne(filters) as WithId<Entity>
  }

  protected async insertOne(entity: Entity): Promise<WithId<Entity>> {
    const creationDate = new Date()

    const data = {
      ...entity,
      createdAt: creationDate,
      updatedAt: creationDate,
    }

    const response = await this.collection().insertOne(data)

    return { data, _id: response.insertedId } as unknown as WithId<Entity>
  }

  // protected async updateOne(id: string, entity: Partial<Entity>): Promise<WithId<Entity>> {
  //   const collection = await this.collection()

  //   const query = {
  //     _id: new ObjectId(id),
  //   } as FilterQuery<Entity>

  //   const update = {
  //     $set: {
  //       ...entity,
  //       updatedAt: new Date(),
  //     }
  //   }

  //   const options: FindOneAndUpdateOption<Entity> = {
  //     returnDocument: 'after',
  //   }

  //   return collection.findOneAndUpdate(query, update, options) as unknown as WithId<Entity>
  // }
}
