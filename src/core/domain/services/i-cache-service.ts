export interface ICacheService<T> {
  get(key: string): T
  set(key: string, value: T): void
  delete(key: string): void
  purgeKeys(keys: string[]): void
}
