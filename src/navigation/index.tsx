import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Main, CharacterInfo, Comics } from '../pages'

const Navigation: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/character/:characterId/comics" component={Comics} />
      <Route path="/character/:id" exact component={CharacterInfo} />
    </Switch>
  </BrowserRouter>
)

export default Navigation
