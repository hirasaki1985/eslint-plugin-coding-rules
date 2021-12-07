import moment from 'moment'
import HealthCheckWebApi from '../../data_sources/web_api/api/HealthCheckWebApi'
import { WebApiResponseCode } from '../../consts/HttpConsts'

export default class HealthCheckRepository {
  /**
   * healthCheck
   */
  public async healthCheck(): Promise<HealthCheckResponse> {
    // execute web api
    const webApi = await HealthCheckWebApi.healthCheck().execute()

    return {
      success: webApi.status === WebApiResponseCode.HTTP_OK,
      checkTime: moment(),
    }
  }
}
