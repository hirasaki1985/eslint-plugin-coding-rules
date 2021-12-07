import {
  STATE_ACTION_HEALTH_CHECK,
  stateActionHealthCheckTypes,
} from './HealthCheckStateType'

export interface HealthCheckState {
  result: HealthCheckResponse
}

export const initializeState: HealthCheckState = {
  result: {
    success: false,
    checkTime: undefined,
  },
}

export function HealthCheckReducer(
  state: HealthCheckState = initializeState,
  action: stateActionHealthCheckTypes,
): HealthCheckState {
  const copyState: HealthCheckState = Object({ ...state })

  switch (action.type) {
    case STATE_ACTION_HEALTH_CHECK:
      copyState.result.success = action.payload.success
      copyState.result.checkTime = action.payload.checkTime
      return copyState

    default:
      return copyState
  }
}
