import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getIsSeriesLoading,
  fetchSeries,
  getSeriesError,
  getCanLoadingMoreSeries,
  getSeriesList,
  resetSeries,
  Series as SeriesType,
} from '../modules/series'
import { characterInfoPageListFactory } from '../components/factories'
import { NormalizedItem } from '../components/factories/characterInfoPageListFactory'

const normalizeItem = (item: SeriesType): NormalizedItem => ({
  image: item.thumbnail
    ? `${item.thumbnail.path}.${item.thumbnail.extension}`
    : undefined,
  title: item.title,
  id: item.id.toString(),
})

const SeriesPage = characterInfoPageListFactory<SeriesType>({ normalizeItem })

const Series: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>()
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsSeriesLoading)
  const error = useSelector(getSeriesError)
  const series = useSelector(getSeriesList)
  const canLoadingMore = useSelector(getCanLoadingMoreSeries)

  React.useEffect(() => {
    dispatch(fetchSeries.request(Number(characterId)))

    return () => {
      dispatch(fetchSeries.cancel())
      dispatch(resetSeries())
    }
  }, [characterId, dispatch])

  const onEndReached = React.useCallback(() => {
    canLoadingMore &&
      !error &&
      dispatch(fetchSeries.request(Number(characterId)))
  }, [canLoadingMore, dispatch, error, characterId])

  const onRepeatClick = React.useCallback(() => {
    dispatch(fetchSeries.request(Number(characterId)))
  }, [dispatch, characterId])

  return (
    <SeriesPage
      error={error}
      isLoading={isLoading}
      items={series}
      onEndReached={onEndReached}
      onRepeatClick={onRepeatClick}
    />
  )
}

export default Series
