import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HandleTestPage from '../containers/HandleTestPage';
import HandleGeneralPage from '../containers/HandleGeneralPage';
import HandleSchedulePage from '../containers/HandleSchedulePage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HandleGeneralPage} />
      <Route exact path='/test' component={HandleTestPage} />
      <Route exact path='/schedule' component={HandleSchedulePage} />
    </Switch>
  </main>
)

export default Main
