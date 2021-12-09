import HealthCheckService from "./health_check/HealthCheckService";

/**
 * services
 */
const healthCheckService = new HealthCheckService();

/**
 * ServiceFactory
 */
export default class ServiceFactory {
  public static getHealthCheckService = () => healthCheckService;
}
