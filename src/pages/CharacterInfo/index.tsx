import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCharacterInfo,
  resetCharacterInfo,
  getIsCharacterInfoLoading,
  getCharacterInfo,
  getCharacterInfoError,
} from '../../modules/characterInfo'
import { MainPage, Scroll } from '../../components'
import { characterItemsInfoFactory } from '../../components/factories'
import { NormalizeItem } from '../../components/factories/characterItemsInfoFactory'
import {
  ComicsPreview,
  EventsPreview,
  StoriesPreview,
  SeriesPreview,
} from '../../modules/characters'

import './style.scss'

const comicsNormalizer = (item: ComicsPreview): NormalizeItem => ({
  description: item.name,
})
const eventsNormalizer = (item: EventsPreview): NormalizeItem => ({
  description: item.name,
})
const storiesNormalizer = (item: StoriesPreview): NormalizeItem => ({
  description: item.name,
})
const seriesNormalizer = (item: SeriesPreview): NormalizeItem => ({
  description: item.name,
})

const Comics = characterItemsInfoFactory<ComicsPreview>({
  normalizer: comicsNormalizer,
  title: 'Comics',
  initialContainerClassName: 'infoList',
  initialItemClassName: 'infoItem',
  initialTitleClassName: 'infoItemName',
  link: 'comics',
})

const Events = characterItemsInfoFactory<EventsPreview>({
  normalizer: eventsNormalizer,
  title: 'Events',
  initialContainerClassName: 'infoList',
  initialItemClassName: 'infoItem',
  initialTitleClassName: 'infoItemName',
  link: 'events',
})

const Stories = characterItemsInfoFactory<StoriesPreview>({
  normalizer: storiesNormalizer,
  title: 'Stories',
  initialContainerClassName: 'infoList',
  initialItemClassName: 'infoItem',
  initialTitleClassName: 'infoItemName',
  link: 'stories',
})

const Series = characterItemsInfoFactory<SeriesPreview>({
  normalizer: seriesNormalizer,
  title: 'Series',
  initialContainerClassName: 'infoList',
  initialItemClassName: 'infoItem',
  initialTitleClassName: 'infoItemName',
  link: 'series',
})

const CharacterInfo: React.FC = () => {
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsCharacterInfoLoading)
  const characterInfo = useSelector(getCharacterInfo)
  const characterInfoError = useSelector(getCharacterInfoError)

  React.useEffect(() => {
    dispatch(fetchCharacterInfo.request(params.id))

    return () => {
      dispatch(fetchCharacterInfo.cancel())
      dispatch(resetCharacterInfo())
    }
  }, [params, dispatch])

  return (
    <MainPage
      isLoading={isLoading}
      error={characterInfoError}
      rewriteContentOnEvents
    >
      {() =>
        characterInfo && (
          <Scroll>
            <img
              src={`${characterInfo.thumbnail.path}.${characterInfo.thumbnail.extension}`}
              className="characterImage"
              alt={characterInfo.name}
            />
            <p>{characterInfo.name}</p>
            <p>Description: {characterInfo.description || 'No description'}</p>
            {!!characterInfo.comics.available && (
              <Comics items={characterInfo.comics.items} />
            )}
            {!!characterInfo.events.available && (
              <Events items={characterInfo.events.items} />
            )}
            {!!characterInfo.stories.available && (
              <Stories items={characterInfo.stories.items} />
            )}
            {!!characterInfo.series.available && (
              <Series items={characterInfo.series.items} />
            )}
          </Scroll>
        )
      }
    </MainPage>
  )
}

export default CharacterInfo
