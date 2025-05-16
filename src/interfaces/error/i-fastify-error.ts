export interface IFastifyErrorPayload {
  errorText: string
  context: unknown
  errorCode: number
}

export interface IFastifyError {
  statusCode: number
  message: string | IFastifyErrorPayload
}
