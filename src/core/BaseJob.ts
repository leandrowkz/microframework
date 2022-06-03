export abstract class BaseJob<Params> {
  abstract handle(params?: Params): Promise<void> | void
}
