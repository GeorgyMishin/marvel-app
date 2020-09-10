export type Image = {
  path: string
  extension: string
}

export type ById<T> = {
  [param: string]: T
}
