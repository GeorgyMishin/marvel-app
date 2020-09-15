import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchComics,
  getComicsError,
  getIsComicsLoading,
  getCanLoadingMoreComics,
  getComicsList,
  resetComics,
  Comics as ComicsType,
} from '../modules/comics'
import { characterInfoPageListFactory } from '../components/factories'
import { NormalizedItem } from '../components/factories/characterInfoPageListFactory'

const normalizeItem = (item: ComicsType): NormalizedItem => ({
  image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
  title: item.title,
  id: item.id.toString(),
})

const ComicsPage = characterInfoPageListFactory<ComicsType>({ normalizeItem })

const Comics: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>()
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsComicsLoading)
  const error = useSelector(getComicsError)
  const comics = useSelector(getComicsList)
  const canLoadingMore = useSelector(getCanLoadingMoreComics)

  React.useEffect(() => {
    dispatch(fetchComics.request(Number(characterId)))

    return () => {
      dispatch(fetchComics.cancel())
      dispatch(resetComics())
    }
  }, [characterId, dispatch])

  const onEndReached = React.useCallback(() => {
    canLoadingMore &&
      !error &&
      !isLoading &&
      dispatch(fetchComics.request(Number(characterId)))
  }, [canLoadingMore, dispatch, error, characterId, isLoading])

  const onRepeatClick = React.useCallback(() => {
    dispatch(fetchComics.request(Number(characterId)))
  }, [dispatch, characterId])

  return (
    <ComicsPage
      items={comics}
      error={error}
      isLoading={isLoading}
      onEndReached={onEndReached}
      onRepeatClick={onRepeatClick}
    />
  )
}

export default Comics
