import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Tactile Literacy Logo"
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[150px] w-auto h-auto', className)}
      src="/tactile-logo.svg"
    />
  )
}
