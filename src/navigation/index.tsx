import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Menu } from '../components'
import { Main, CharacterInfo, Comics, Series, Events, Stories } from '../pages'

const Navigation: React.FC = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/character/:characterId/comics" component={Comics} />
      <Route path="/character/:characterId/series" component={Series} />
      <Route path="/character/:characterId/stories" component={Stories} />
      <Route path="/character/:characterId/events" component={Events} />
      <Route path="/character/:id" exact component={CharacterInfo} />
    </Switch>
  </BrowserRouter>
)

export default Navigation
