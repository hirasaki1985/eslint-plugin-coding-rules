import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import ServiceFactory from '../../modules/ServiceFactory'
import { stateActionHealthCheck } from '../state/health_check/HealthCheckStateAction'

/**
 * execute health check
 */
// eslint-disable-next-line import/prefer-default-export
export function useHealthCheckAction() {
  const dispatch = useDispatch()
  const healthCheckService = ServiceFactory.getHealthCheckService()

  return useCallback(async (): Promise<HealthCheckResponse> => {
    // execute service
    const result = await healthCheckService.healthCheck()

    // dispatch
    dispatch(stateActionHealthCheck(result))

    return result
  }, [healthCheckService])
}
