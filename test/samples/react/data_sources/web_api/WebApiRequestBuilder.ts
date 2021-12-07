import axios, { AxiosInstance } from 'axios'
import { WebApiContentType, WebApiMethod } from '../../consts/HttpConsts'
import DotEnv from '../../consts/DotEnv'
import WebApiRequest from './WebApiRequest'

class WebApiRequestBuilder<Request, Response> {
  private baseUrl: string

  private path: string

  private version: string

  private method: WebApiMethod

  private contentType: WebApiContentType = WebApiContentType.JSON

  private withAuth: boolean

  private httpClient: AxiosInstance

  private conversionCallback = (data: any): Response => data

  /**
   * constructor
   */
  constructor(
    path: string,
    method: WebApiMethod,
    baseUrl: string = DotEnv.webApi().baseUrl,
    version: string = DotEnv.webApi().defaultVersion,
    contentType: WebApiContentType = WebApiContentType.JSON,
  ) {
    this.path = path
    this.method = method
    this.version = version
    this.contentType = contentType
    this.baseUrl = baseUrl
    this.withAuth = false

    // http client
    this.httpClient = axios.create({})
  }

  /**
   * auth
   */
  public auth(withAuth = false): WebApiRequestBuilder<Request, Response> {
    this.withAuth = withAuth
    return this
  }

  public setBaseUrl(baseUrl: string): WebApiRequestBuilder<Request, Response> {
    this.baseUrl = baseUrl
    return this
  }

  public setConversionCallback(
    callback: (data: any) => Response,
  ): WebApiRequestBuilder<Request, Response> {
    this.conversionCallback = callback
    return this
  }

  public setFormat(
    contentType: WebApiContentType,
  ): WebApiRequestBuilder<Request, Response> {
    this.contentType = contentType
    return this
  }

  public build(): WebApiRequest<Request, Response> {
    return new WebApiRequest<Request, Response>(
      this.baseUrl,
      this.path,
      this.version,
      this.method,
      this.contentType,
      this.withAuth,
      this.httpClient,
      this.conversionCallback,
    )
  }
}

export default WebApiRequestBuilder
