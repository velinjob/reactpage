import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TestPage from './TestPage';
import EmptyComponent from './EmptyComponent';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={TestPage} />
      <Route exact path='/test' component={TestPage} />
      <Route path='/reg' component={EmptyComponent} />
    </Switch>
  </main>
)

export default Main
