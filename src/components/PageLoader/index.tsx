import React from 'react'
import Loader from 'react-loader-spinner'

import './style.scss'

const PageLoader: React.FC = () => (
  <div className="pageLoaderContainer">
    <Loader width={80} height={80} type="Puff" color="#EC1D24" />
  </div>
)

export default PageLoader
