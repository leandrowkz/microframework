export abstract class BaseAdapter <From, To> {
  abstract transform(input: From): Promise<To> | To
}
