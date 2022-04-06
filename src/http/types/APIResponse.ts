import { APIResponseStatus } from './APIResponseStatus'

export interface APIResponse<Resource> {
  code: number,
  status: APIResponseStatus,
  data?: Resource,
  message?: string,
  stack?: string,
  errors?: string[],
}
