import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHealthCheckAction } from '../stores/hooks/HealthCheckActionHook'
import HealthCheckOrganisms from '../components/organisms/HealthCheckOrganisms'
import { RootState } from '../stores'

const MainPage = () => {
  const state = useSelector((_state: RootState) => _state)

  const healthCheckAction = useHealthCheckAction()

  /**
   *
   */
  const onClickHealthCheckButton = async () => {
    const result = await healthCheckAction()
    console.log('MainPage healthCheck()')
    console.log({
      result,
    })
  }

  return (
    <div>
      <HealthCheckOrganisms
        onClickHealthCheckButton={onClickHealthCheckButton}
        result={state.healthCheck.result}
      />
    </div>
  )
}

export default MainPage
