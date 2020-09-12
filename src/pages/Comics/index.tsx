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
} from '../../modules/comics'
import { MainPage, Scroll } from '../../components'

import './style.scss'

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
  }, [characterId])

  return (
    <MainPage error={error} isLoading={isLoading}>
      {() => (
        <Scroll
          onEndReached={() =>
            canLoadingMore && dispatch(fetchComics.request(Number(characterId)))
          }
        >
          {comics.map((item) => (
            <div key={item.id}>
              <img
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

export default Comics
