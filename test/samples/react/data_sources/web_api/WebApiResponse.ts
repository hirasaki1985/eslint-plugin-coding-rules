import { HttpResponse, WebApiResponseCode } from "../../consts/HttpConsts";

export default class WebApiResponse<Res> {
  public status: WebApiResponseCode = WebApiResponseCode.INIT;

  public headers: any;

  public data: Res;

  public errorMessages?: string[];

  constructor(response: HttpResponse, converter: (data: any) => Res) {
    this.status = response.status;
    this.headers = response.headers;
    this.data = converter(response.data);
    this.errorMessages = [response.errorMessage];
  }
}

export function getWebApiInitResponse<Res>(data: Res) {
  const response: HttpResponse = {
    status: WebApiResponseCode.INIT,
    headers: {},
    data,
    errorMessage: "",
  };
  return new WebApiResponse(response, (_data) => _data);
}
