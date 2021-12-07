import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import ServiceFactory from '../../modules/ServiceFactory'
import { stateActionHealthCheck } from '../state/health_check/HealthCheckStateAction'
import HealthCheckRepository from "../../modules/health_check/HealthCheckRepository";

/**
 *
 */
// eslint-disable-next-line import/prefer-default-export
export function useInvalidAction() {
  const dispatch = useDispatch()

  return useCallback(async (): Promise<HealthCheckResponse> => {
    const repository = new HealthCheckRepository()

    // execute service
    const result = await repository.healthCheck()

    // dispatch
    dispatch(stateActionHealthCheck(result))

    return result
  }, [])
}
