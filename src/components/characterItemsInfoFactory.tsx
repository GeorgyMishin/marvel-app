import React from 'react'
import { Link } from 'react-router-dom'

const defaultKeyExtractor = (_: any, index: number) => index

export type NormalizeItem = {
  description: string
}

type FactoryProps<T> = {
  title: string
  normalizer: (item: T) => NormalizeItem
  keyExtractor?: (item: T, index: number) => number | string
  initialContainerClassName?: string
  initialItemClassName?: string
  initialTitleClassName?: string
  link: string
}

type Props<T> = {
  items: T[]
  containerClassName?: string
  itemClassName?: string
  itemTitleClassName?: string
}

const characterItemsInfoFactory = <T,>({
  title,
  normalizer,
  keyExtractor = defaultKeyExtractor,
  initialContainerClassName,
  initialItemClassName,
  initialTitleClassName,
  link,
}: FactoryProps<T>): React.FC<Props<T>> => ({
  items,
  containerClassName = initialContainerClassName,
  itemClassName = initialItemClassName,
  itemTitleClassName = initialTitleClassName,
}) => {
  return (
    <div>
      <p>{title}</p>
      <div className={containerClassName}>
        {items.map((item, index) => {
          const info = normalizer(item)
          const key = keyExtractor(item, index)

          return (
            <div key={key} className={itemClassName}>
              <p className={itemTitleClassName}>{info.description}</p>
            </div>
          )
        })}
        <div className={itemClassName}>
          <Link to={({ pathname }) => `${pathname}/${link}`}>See all</Link>
        </div>
      </div>
    </div>
  )
}

export default characterItemsInfoFactory
