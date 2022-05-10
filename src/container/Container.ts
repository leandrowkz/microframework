import { inject, injectable, container as RootContainer } from 'tsyringe'
import { RegisterPayload } from '@/container/types/RegisterPayload'

const container = RootContainer.createChildContainer()

export class Container {
  static inject = inject
  static injectable = injectable
  static container = container

  static resolve<Resource>(token: any): Resource {
    return this.container.resolve<Resource>(token)
  }

  static register(payload: RegisterPayload) {
    const { token, resource, singleton } = payload

    if (singleton) {
      this.container.registerSingleton(token, resource)
    } else {
      this.container.register(token, resource)
    }
  }
}