import { AxiosInstance, AxiosResponse } from "axios";
import {
  HttpRequestParams,
  HttpResponse,
  WebApiContentType,
  WebApiMethod,
} from "../../consts/HttpConsts";
import WebApiResponse from "./WebApiResponse";
import ObjectUtil from "../../utils/ObjectUtil";

/**
 * Web Api Request
 */
class WebApiRequest<Req, Res> {
  // parameters
  private baseUrl: string;

  private path: string;

  private version: string;

  private method: WebApiMethod;

  private contentType: WebApiContentType;

  private withAuth: boolean;

  private httpClient: AxiosInstance;

  // converter
  private conversionCallback: (data: Res) => Res;

  constructor(
    baseUrl: string,
    path: string,
    version: string,
    method: WebApiMethod,
    contentType: WebApiContentType,
    withAuth: boolean,
    httpClient: AxiosInstance,
    conversionCallback: (data: any) => Res
  ) {
    // parameters
    this.baseUrl = baseUrl;
    this.path = path;
    this.version = version;
    this.method = method;
    this.contentType = contentType;
    this.withAuth = withAuth;
    this.httpClient = httpClient;
    this.conversionCallback = conversionCallback;
  }

  /**
   * get request url
   */
  private getRequestUrl(path: string): string {
    return `${this.baseUrl}${this.version}${path}`;
  }

  /**
   * HTTPリクエストを実行する。
   */
  public async execute(params?: Req): Promise<WebApiResponse<Res>> {
    // リクエストを実行
    const response = await this.request(params);

    // 戻り値を作成
    return new WebApiResponse<Res>(response, this.conversionCallback);
  }

  /**
   *
   */
  private async request(params?: Req): Promise<HttpResponse> {
    const requestParams: HttpRequestParams = ObjectUtil.filterNull(params);
    const url = this.getRequestUrl(this.path);
    let result: AxiosResponse;

    switch (this.method) {
      // get
      case WebApiMethod.GET:
        result = await this.executeGetMethod(url, requestParams);
        break;

      // delete
      case WebApiMethod.DELETE:
        result = await this.executeDeleteMethod(url, requestParams);
        break;

      // post
      case WebApiMethod.POST:
        result = await this.executePostMethod(url, requestParams);
        break;

      // put
      case WebApiMethod.PUT:
        result = await this.executePutMethod(url, requestParams);
        break;

      // patch
      case WebApiMethod.PATCH:
        result = await this.executePatchMethod(url, requestParams);
        break;

      // default
      default:
        throw new Error(`Illegal request method '${this.method}'.`);
    }

    if (result == null) {
      throw new Error(`web api request is no response`);
    }

    return {
      status: Number(result.status),
      headers: result.headers,
      data: result.data,
      errorMessage: "",
    };
  }

  /**
   * getメソッドを実行する
   */
  private executeGetMethod = async (
    url: string,
    params?: HttpRequestParams
  ): Promise<AxiosResponse> => {
    const result = await this.httpClient.get(url, { params });
    return result;
  };

  /**
   * postメソッドを実行する
   */
  private executePostMethod = async (
    url: string,
    params?: HttpRequestParams
  ): Promise<AxiosResponse> => {
    const result = await this.httpClient.post(url, params);
    return result;
  };

  /**
   * postメソッドを実行する
   */
  private executeDeleteMethod = async (
    url: string,
    params?: HttpRequestParams
  ): Promise<AxiosResponse> => {
    const result = await this.httpClient.delete(url, { params });
    return result;
  };

  /**
   * putメソッドを実行する
   */
  private executePutMethod = async (
    url: string,
    params?: HttpRequestParams
  ): Promise<AxiosResponse> => {
    const result = await this.httpClient.put(url, params);
    return result;
  };

  /**
   * patchメソッドを実行する
   */
  private executePatchMethod = async (
    url: string,
    params?: HttpRequestParams
  ): Promise<AxiosResponse> => {
    const result = await this.httpClient.patch(url, params);
    return result;
  };
}

export default WebApiRequest;
