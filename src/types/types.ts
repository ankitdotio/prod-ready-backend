export type thttpResponse = {
  success: boolean
  statusCode: number
  request: {
    ip?: string | null
    url: string
    method: string
  }
  message: string
  data: unknown
  trace?: object | null
}

export type thttpError = {
  success: boolean
  statusCode: number
  request: {
    ip?: string | null
    url: string
    method: string
  }
  message: string
  trace?: object | null
  data: unknown
}
