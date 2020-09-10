import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchCharacters } from '../modules/characters'

const Main: React.FC = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchCharacters.request())
  }, [])

  return <div />
}

export default Main
