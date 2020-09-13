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
import { MainPage, Scroll, CharacterItem } from '../../components'

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
      dispatch(fetchCharacters.cancel())
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
        <Scroll className="scrollView" onEndReached={onEndReached}>
          {characters.map((character) => (
            <CharacterItem
              item={character}
              onViewPress={() => redirectToCharacter(character.id)}
            />
          ))}
        </Scroll>
      )}
    </MainPage>
  )
}

export default Main
