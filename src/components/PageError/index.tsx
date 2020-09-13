import React from 'react'

import './style.scss'

type PageErrorProps = {
  error?: Error
}

const PageError: React.FC<PageErrorProps> = ({ error }) => (
  <div className="pageErrorContainer">
    <p className="pageErrorTitle">{error?.message ?? 'Error'}</p>
  </div>
)

export default PageError
