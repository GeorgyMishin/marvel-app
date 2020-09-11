import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters, resetCharacters } from '../../modules/characters'
import {
  getCharactersList,
  getIsCharactersLoading,
} from '../../modules/characters/selectors'
import { MainPage } from '../../components'

import './style.scss'

const Main: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const characters = useSelector(getCharactersList)
  const isLoading = useSelector(getIsCharactersLoading)

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

  return (
    <MainPage isLoading={isLoading}>
      {() => (
        <div className="charactersList">
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
        </div>
      )}
    </MainPage>
  )
}

export default Main
