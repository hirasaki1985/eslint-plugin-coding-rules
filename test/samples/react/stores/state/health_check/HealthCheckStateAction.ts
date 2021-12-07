import { STATE_ACTION_HEALTH_CHECK } from './HealthCheckStateType'

// eslint-disable-next-line import/prefer-default-export
export function stateActionHealthCheck(result: HealthCheckResponse) {
  return {
    type: STATE_ACTION_HEALTH_CHECK,
    payload: result,
  }
}
