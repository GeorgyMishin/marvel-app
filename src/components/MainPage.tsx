import React from 'react'
import classnames from 'classnames'

type MainPageProps = {
  isLoading: boolean
  rewriteContentOnEvents?: boolean
  error?: Error | null
  renderPreloader?: () => React.ReactNode
  className?: string
  children: () => React.ReactNode
}

const defaultPreloader = () => <div>Loading...</div>

const MainPage: React.FC<MainPageProps> = ({
  isLoading,
  rewriteContentOnEvents,
  error,
  renderPreloader = defaultPreloader,
  className,
  children,
}) => {
  const classname = classnames(className, 'mainPage')
  return (
    <div className={classname}>
      {(isLoading || error) && rewriteContentOnEvents ? null : children()}
      {isLoading && renderPreloader()}
      {!!error && <div>{error.message}</div>}
    </div>
  )
}

export default MainPage
