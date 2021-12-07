import HealthCheckRepository from './HealthCheckRepository'

export default class HealthCheckService {
  private healthCheckRepository: HealthCheckRepository

  constructor(healthCheckRepository = new HealthCheckRepository()) {
    this.healthCheckRepository = healthCheckRepository
  }

  /**
   * healthCheck
   */
  public async healthCheck(): Promise<HealthCheckResponse> {
    const healthCheckResult = await this.healthCheckRepository.healthCheck()
    return healthCheckResult
  }
}
