import React from 'react'
import MainPage from '../../MainPage'
import PaginationError from '../../PaginationError'
import PaginationLoader from '../../PaginationLoader'
import Scroll from '../../Scroll'

import './style.scss'

export type NormalizedItem = {
  image?: string
  title: string
  id: string
}

type FactoryProps<T> = {
  normalizeItem: (item: T) => NormalizedItem
}

type PageListProps<T> = {
  onEndReached: () => void
  error?: Error | null
  isLoading: boolean
  items: T[]
  onRepeatClick?: () => void
}

const characterInfoPageListFactory = <T,>({
  normalizeItem,
}: FactoryProps<T>): React.FC<PageListProps<T>> => ({
  onEndReached,
  error,
  isLoading,
  items,
  onRepeatClick,
}) => (
  <MainPage
    error={error}
    isLoading={isLoading}
    enableError={items.length === 0}
    enablePreloader={items.length === 0}
  >
    {() => (
      <Scroll onEndReached={onEndReached}>
        {items.map((item) => {
          const normalizedItem = normalizeItem(item)
          return (
            <div key={normalizedItem.id}>
              <img
                alt={normalizedItem.title}
                className="comicsImage"
                src={normalizedItem.image}
              />
              <p>{normalizedItem.title}</p>
            </div>
          )
        })}
        {isLoading && items.length > 0 && <PaginationLoader />}
        {!!error && (
          <PaginationError error={error} onRepeatClick={onRepeatClick} />
        )}
      </Scroll>
    )}
  </MainPage>
)

export default characterInfoPageListFactory
