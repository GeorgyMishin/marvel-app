import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Main, CharacterInfo } from '../pages'

const Navigation: React.FC = () => (
  <BrowserRouter>
    <Route path="/" component={Main} exact />
    <Route path="/character/:id" component={CharacterInfo} />
  </BrowserRouter>
)

export default Navigation
