import React from 'react'
import classnames from 'classnames'

import './style.scss'

type ScrollProps = {
  className?: string
  onEndReached?: () => void
  onScroll?: (scroll: number) => void
  endReachedInterval?: number
  renderFooter?: () => React.ReactNode
}

const Scroll: React.FC<ScrollProps> = ({
  className,
  onEndReached,
  onScroll,
  children,
  renderFooter,
}) => {
  const classNames = classnames('mainScroll', className)
  const scrollRef = React.useRef<HTMLDivElement>(null)

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
    <div ref={scrollRef} onScroll={onScrollEvent} className={classNames}>
      {children}
      {renderFooter?.()}
    </div>
  )
}

export default Scroll
