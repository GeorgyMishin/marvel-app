import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCharacterInfo,
  resetCharacterInfo,
  getIsCharacterInfoLoading,
  getCharacterInfo,
  getCharacterInfoError,
} from '../../modules/characterInfo'
import { MainPage } from '../../components'

import './style.scss'

const CharacterInfo: React.FC = () => {
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsCharacterInfoLoading)
  const characterInfo = useSelector(getCharacterInfo)
  const characterInfoError = useSelector(getCharacterInfoError)

  React.useEffect(() => {
    dispatch(fetchCharacterInfo.request(params.id))

    return () => {
      dispatch(resetCharacterInfo())
    }
  }, [params, dispatch])

  return (
    <MainPage isLoading={isLoading} error={characterInfoError}>
      {() =>
        characterInfo && (
          <div>
            <img
              src={`${characterInfo.thumbnail.path}.${characterInfo.thumbnail.extension}`}
              className="characterImage"
            />
            <p>{characterInfo.name}</p>
            <p>{characterInfo.description}</p>
          </div>
        )
      }
    </MainPage>
  )
}

export default CharacterInfo
