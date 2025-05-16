export type FindByID = {
  id: number
}

export type Delete = FindByID

export type Count = {
  name: string | undefined
}

export type Paginate<T, K extends string> = {
  [key in K]: T[]
} & {
  total: number
  count: number
  page: number
  perPage: number
  totalPages: number
  hasNext: boolean
  cacheValue?: string
}
