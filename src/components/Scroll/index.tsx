import React from 'react'
import classnames from 'classnames'

import './style.scss'

type ScrollProps = {
  className?: string
  onEndReached?: () => void
  onScroll?: (scroll: number) => void
  endReachedInterval?: number
}

const Scroll: React.FC<ScrollProps> = ({
  className,
  onEndReached,
  onScroll,
  children,
}) => {
  const classNames = classnames('mainScroll', className)

  const onScrollEvent = React.useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      if (
        event.currentTarget.scrollTop + event.currentTarget.clientHeight ===
        event.currentTarget.scrollHeight
      ) {
        onEndReached?.()
      }

      onScroll?.(event.currentTarget.scrollTop)
    },
    [onScroll, onEndReached],
  )

  return (
    <div onScroll={onScrollEvent} className={classNames}>
      {children}
    </div>
  )
}

export default Scroll
