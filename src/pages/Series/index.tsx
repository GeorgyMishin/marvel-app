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
} from '../../modules/series'
import { MainPage, Scroll } from '../../components'

import './style.scss'

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
  }, [characterId])

  return (
    <MainPage error={error} isLoading={isLoading}>
      {() => (
        <Scroll
          onEndReached={() =>
            canLoadingMore && dispatch(fetchSeries.request(Number(characterId)))
          }
        >
          {series.map((item) => (
            <div key={item.id}>
              {!!item.thumbnail && (
                <img
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

export default Series
