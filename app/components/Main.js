import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HandleTestPage from '../containers/HandleTestPage';
import HandleGeneralPage from '../containers/HandleGeneralPage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HandleGeneralPage} />
      <Route exact path='/test' component={HandleTestPage} />
    </Switch>
  </main>
)

export default Main
