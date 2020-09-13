import React from 'react'
import classnames from 'classnames'
import PageLoader from './PageLoader'
import PageError from './PageError'

type MainPageProps = {
  isLoading: boolean
  rewriteContentOnEvents?: boolean
  error?: Error | null
  renderPreloader?: () => React.ReactNode
  renderError?: () => React.ReactNode
  enablePreloader?: boolean
  enableError?: boolean
  className?: string
  children: () => React.ReactNode
}

const defaultPreloader = () => <PageLoader />
const defaultRenderError = (error: Error) => <PageError error={error} />

const MainPage: React.FC<MainPageProps> = ({
  isLoading,
  rewriteContentOnEvents,
  error,
  renderPreloader = defaultPreloader,
  enableError = true,
  renderError = defaultRenderError,
  enablePreloader = true,
  className,
  children,
}) => {
  const classname = classnames(className, 'mainPage')
  return (
    <div className={classname}>
      {(isLoading || error) && rewriteContentOnEvents ? null : children()}
      {isLoading && enablePreloader && renderPreloader()}
      {!!error && enableError && renderError(error)}
    </div>
  )
}

export default MainPage
