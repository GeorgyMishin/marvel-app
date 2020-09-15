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
  Events as EventsType,
} from '../modules/events'
import { characterInfoPageListFactory } from '../components/factories'
import { NormalizedItem } from '../components/factories/characterInfoPageListFactory'

const normalizeItem = (item: EventsType): NormalizedItem => ({
  image: item.thumbnail
    ? `${item.thumbnail.path}.${item.thumbnail.extension}`
    : undefined,
  title: item.title,
  id: item.id.toString(),
})

const EventsPage = characterInfoPageListFactory<EventsType>({ normalizeItem })

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

  const onEndReached = React.useCallback(() => {
    canLoadingMore &&
      !error &&
      !isLoading &&
      dispatch(fetchEvents.request(Number(characterId)))
  }, [canLoadingMore, dispatch, error, characterId, isLoading])

  const onRepeatClick = React.useCallback(() => {
    dispatch(fetchEvents.request(Number(characterId)))
  }, [dispatch, characterId])

  return (
    <EventsPage
      isLoading={isLoading}
      error={error}
      items={events}
      onEndReached={onEndReached}
      onRepeatClick={onRepeatClick}
    />
  )
}

export default Events
