/**
 * http: レスポンスコード一覧
 */
export enum WebApiResponseCode {
  INIT = 0,
  HTTP_OK = 200,
  HTTP_CREATED = 201,
  HTTP_NO_CONTENT = 204,
  HTTP_BAD_REQUEST = 400,
  HTTP_UNAUTHORIZED = 401,
  HTTP_FORBIDDEN = 403,
  HTTP_CONFLICT = 409,
  HTTP_UNPROCESSABLE_ENTITY = 422,
  HTTP_INTERNAL_SERVER_ERROR = 500,
}

/**
 * http: メソッド一覧
 *
 */
export enum WebApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * http: content type
 */
export enum WebApiContentType {
  JSON = 'application/json; charset=UTF-8',
  MULTI_PART = 'multipart/form-data',
}

/**
 * http: token type
 */
export enum WebApiTokenType {
  BEARER = 'Bearer',
}

/**
 * http: token header key
 */
export enum WebApiTokenHeaderKey {
  AUTHORIZATION = 'Authorization',
}

export type HttpRequestParams = { [key: string]: any }

export interface HttpResponse {
  status: WebApiResponseCode
  headers: any
  data: any
  errorMessage: string
}
