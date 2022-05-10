import { inject, injectable, container as RootContainer } from 'tsyringe'
import { RegisterPayload } from '@/container/types/RegisterPayload'

export class Container {
  static inject = inject
  static injectable = injectable
  static container = RootContainer.createChildContainer()

  static resolve<Resource>(token: any): Resource {
    return this.container.resolve<Resource>(token)
  }

  static register(payload: RegisterPayload) {
    const { token, resource } = payload

    this.container.registerSingleton(token, resource)
  }
}
