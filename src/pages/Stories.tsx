import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getIsStoriesLoading,
  fetchStories,
  getStoriesError,
  getCanLoadingMoreStories,
  getStoriesList,
  resetStories,
  Story,
} from '../modules/stories'
import { characterInfoPageListFactory } from '../components/factories'
import { NormalizedItem } from '../components/factories/characterInfoPageListFactory'

const normalizeItem = (item: Story): NormalizedItem => ({
  image: item.thumbnail
    ? `${item.thumbnail.path}.${item.thumbnail.extension}`
    : undefined,
  title: item.title,
  id: item.id.toString(),
})

const StoriesPage = characterInfoPageListFactory<Story>({ normalizeItem })

const Events: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>()
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsStoriesLoading)
  const error = useSelector(getStoriesError)
  const stories = useSelector(getStoriesList)
  const canLoadingMore = useSelector(getCanLoadingMoreStories)

  React.useEffect(() => {
    dispatch(fetchStories.request(Number(characterId)))

    return () => {
      dispatch(fetchStories.cancel())
      dispatch(resetStories())
    }
  }, [characterId, dispatch])

  const onEndReached = React.useCallback(() => {
    canLoadingMore &&
      !isLoading &&
      !error &&
      dispatch(fetchStories.request(Number(characterId)))
  }, [canLoadingMore, dispatch, error, characterId, isLoading])

  const onRepeatClick = React.useCallback(() => {
    dispatch(fetchStories.request(Number(characterId)))
  }, [dispatch, characterId])

  return (
    <StoriesPage
      items={stories}
      error={error}
      isLoading={isLoading}
      onEndReached={onEndReached}
      onRepeatClick={onRepeatClick}
    />
  )
}

export default Events
