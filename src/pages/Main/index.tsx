import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters } from '../../modules/characters'
import { getCharactersList } from '../../modules/characters/selectors'

import './style.scss'

const Main: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const characters = useSelector(getCharactersList)

  React.useEffect(() => {
    dispatch(fetchCharacters.request())
  }, [dispatch])

  const redirectToCharacter = React.useCallback(
    (id) => history.push(`character/${id}`),
    [history],
  )

  return (
    <div className="charactersList">
      {characters.map((character) => (
        <div key={character.id} className="characterItem">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            className="characterImage"
          />
          <p>{character.name}</p>
          <button onClick={() => redirectToCharacter(character.id)}>
            View
          </button>
        </div>
      ))}
    </div>
  )
}

export default Main
