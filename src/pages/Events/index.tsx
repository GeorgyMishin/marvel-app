import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getIsEventsLoading,
  fetchEvents,
  getEventsError,
  getCanLoadingMoreEvents,
  getEventsList,
  resetEvents,
} from '../../modules/events'
import { MainPage, Scroll } from '../../components'

import './style.scss'

const Events: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>()
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsEventsLoading)
  const error = useSelector(getEventsError)
  const events = useSelector(getEventsList)
  const canLoadingMore = useSelector(getCanLoadingMoreEvents)

  React.useEffect(() => {
    dispatch(fetchEvents.request(Number(characterId)))

    return () => {
      dispatch(fetchEvents.cancel())
      dispatch(resetEvents())
    }
  }, [characterId, dispatch])

  return (
    <MainPage error={error} isLoading={isLoading}>
      {() => (
        <Scroll
          onEndReached={() =>
            canLoadingMore && dispatch(fetchEvents.request(Number(characterId)))
          }
        >
          {events.map((item) => (
            <div key={item.id}>
              <img
                alt={item.title}
                className="comicsImage"
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              />
              <p>{item.title}</p>
            </div>
          ))}
        </Scroll>
      )}
    </MainPage>
  )
}

export default Events
