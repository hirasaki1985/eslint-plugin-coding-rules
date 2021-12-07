import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import MainPage from '../pages/MainPage'

const RootRouter = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Redirect to="/" />
  </Switch>
)

export default RootRouter
