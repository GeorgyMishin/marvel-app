import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Main, CharacterInfo } from '../pages'

const Navigation: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/character/:id" component={CharacterInfo} />
    </Switch>
  </BrowserRouter>
)

export default Navigation
