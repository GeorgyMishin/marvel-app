import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './navigation'
import store from './modules/store'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const App: React.FC = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
)

export default App
