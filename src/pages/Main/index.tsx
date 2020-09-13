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
import {
  MainPage,
  Scroll,
  CharacterItem,
  PaginationLoader,
  PaginationError,
} from '../../components'

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
    if (canLoadingMore && !error) {
      dispatch(fetchCharacters.request())
    }
  }, [dispatch, canLoadingMore, error])

  const onRepeatClick = React.useCallback(() => {
    dispatch(fetchCharacters.request())
  }, [dispatch])

  return (
    <MainPage
      error={error}
      isLoading={isLoading}
      enableError={characters.length === 0}
      enablePreloader={characters.length === 0}
    >
      {() => (
        <Scroll className="scrollView" onEndReached={onEndReached}>
          {characters.map((character) => (
            <CharacterItem
              key={character.id}
              item={character}
              onViewPress={() => redirectToCharacter(character.id)}
            />
          ))}
          {isLoading && characters.length > 0 && <PaginationLoader />}
          {!!error && (
            <PaginationError error={error} onRepeatClick={onRepeatClick} />
          )}
        </Scroll>
      )}
    </MainPage>
  )
}

export default Main
