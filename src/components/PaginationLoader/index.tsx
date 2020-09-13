import React from 'react'
import Loader from 'react-loader-spinner'

import './style.scss'

const PaginationLoader: React.FC = () => (
  <div className="paginationLoaderContainer">
    <Loader width={60} height={60} type="Puff" color="#EC1D24" />
  </div>
)

export default PaginationLoader
