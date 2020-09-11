import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters, resetCharacters } from '../../modules/characters'
import {
  getCharactersList,
  getIsCharactersLoading,
  getCharactersError,
  getCanLoadingMoreCharacters,
} from '../../modules/characters/selectors'
import { MainPage, Scroll } from '../../components'

import './style.scss'

const Main: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const characters = useSelector(getCharactersList)
  const isLoading = useSelector(getIsCharactersLoading)
  const error = useSelector(getCharactersError)
  const canLoadingMore = useSelector(getCanLoadingMoreCharacters)

  React.useEffect(() => {
    dispatch(fetchCharacters.request())

    return () => {
      dispatch(resetCharacters())
    }
  }, [dispatch])

  const redirectToCharacter = React.useCallback(
    (id) => history.push(`character/${id}`),
    [history],
  )

  const onEndReached = React.useCallback(() => {
    if (canLoadingMore) {
      dispatch(fetchCharacters.request())
    }
  }, [dispatch, canLoadingMore])

  return (
    <MainPage error={error} isLoading={isLoading}>
      {() => (
        <Scroll onEndReached={onEndReached} className="charactersList">
          {characters.map((character) => (
            <div key={character.id} className="characterItem">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                className="characterImage"
              />
              <p>{character.name}</p>
              <button
                className="characterViewButton"
                onClick={() => redirectToCharacter(character.id)}
              >
                View
              </button>
            </div>
          ))}
        </Scroll>
      )}
    </MainPage>
  )
}

export default Main
