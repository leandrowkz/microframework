import { BaseEvent } from '@/core/BaseEvent'
import { User } from '@/domain/user/types/User'

export class UserCreatedEvent extends BaseEvent<User> {
  topic = 'Queue.User.Created'
}