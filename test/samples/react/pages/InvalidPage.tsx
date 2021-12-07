import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HealthCheckOrganisms from '../components/organisms/HealthCheckOrganisms'
import { RootState } from '../stores'
import InvalidService from "../modules/invalid/InvalidService";

const MainPage = () => {
  const state = useSelector((_state: RootState) => _state)

  /**
   *
   */
  const onClickHealthCheckButton = async () => {
    const service = new InvalidService()
    const result = await service.healthCheck()
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
