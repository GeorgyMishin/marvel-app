import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchCharacterInfo } from '../modules/characters'

const Character: React.FC = () => {
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchCharacterInfo.request(params.id))
  }, [params, dispatch])

  return <div />
}

export default Character
