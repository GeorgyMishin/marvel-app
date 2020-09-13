import React from 'react'

import './style.scss'

type PaginationErrorProps = {
  error?: Error
  onRepeatClick?: () => void
}

const PaginationError: React.FC<PaginationErrorProps> = ({
  error,
  onRepeatClick,
}) => (
  <div className="paginationErrorContainer">
    <p className="paginationErrorTitle">{error?.message ?? 'Error'}</p>
    <button className="paginationRepeatButton" onClick={onRepeatClick}>
      Repeat
    </button>
  </div>
)

export default PaginationError
