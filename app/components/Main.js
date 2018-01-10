import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HandleTestPage from '../containers/HandleTestPage';
import WelcomePage from './WelcomePage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={WelcomePage} />
      <Route exact path='/test' component={HandleTestPage} />
    </Switch>
  </main>
)

export default Main
