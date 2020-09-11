export type Image = {
  path: string
  extension: string
}

export type ById<T> = {
  [param: string]: T
}

export type DataPagination<T> = {
  count: number
  limit: number
  offset: number
  results: T[]
  total: number
}

export type ResponseData<T> = {
  attributionHTML: string
  attributionText: string
  code: number
  copyright: string
  data: T
}
