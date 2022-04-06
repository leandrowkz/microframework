export abstract class BaseHelper<Input, Output> {
  abstract run(input: Input): Promise<Output> | Output
}
