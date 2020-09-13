import React from 'react'
import { useHistory } from 'react-router-dom'
import MarvelIcon from '../MarvelIcon'

import './style.scss'

const Menu: React.FC = () => {
  const history = useHistory()

  return (
    <div className="menu">
      <MarvelIcon className="logo" onClick={() => history.push('/')} />
    </div>
  )
}

export default React.memo(Menu, () => false)
