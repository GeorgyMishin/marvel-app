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
} from '../../modules/stories'
import { MainPage, Scroll } from '../../components'

import './style.scss'

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

  return (
    <MainPage error={error} isLoading={isLoading}>
      {() => (
        <Scroll
          onEndReached={() =>
            canLoadingMore &&
            dispatch(fetchStories.request(Number(characterId)))
          }
        >
          {stories.map((item) => (
            <div key={item.id}>
              {!!item.thumbnail && (
                <img
                  alt={item.title}
                  className="comicsImage"
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                />
              )}
              <p>{item.title}</p>
            </div>
          ))}
        </Scroll>
      )}
    </MainPage>
  )
}

export default Events
