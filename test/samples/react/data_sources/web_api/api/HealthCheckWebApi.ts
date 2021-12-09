import Builder from "../WebApiRequestBuilder";
import { WebApiMethod } from "../../../consts/HttpConsts";

export default class HealthCheckWebApi {
  /**
   * healthCheck
   */
  public static healthCheck() {
    return new Builder<HealthCheckWebApiRequest, HealthCheckWebApiResponse>(
      "/heartbeat",
      WebApiMethod.GET
    ).build();
  }
}
