import React from 'react'

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
}) => (
  <div className={className}>
    {(isLoading || error) && rewriteContentOnEvents ? null : children()}
    {isLoading && renderPreloader()}
    {!!error && <div>{error.message}</div>}
  </div>
)

export default MainPage
