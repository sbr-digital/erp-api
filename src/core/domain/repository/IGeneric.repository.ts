export interface IGenericRepository<T, Count, Save, Update, Find, Delete> {
  count(data?: Count): Promise<number>
  save(data: Save): Promise<T>
  update(data: Update): Promise<void>
  findByID(data: Find): Promise<T | null>
  delete(data: Delete): Promise<void>
}
