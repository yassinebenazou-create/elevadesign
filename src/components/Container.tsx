import type { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<{
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}>

const sizeClass = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[90rem]',
}

export function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizeClass[size]} ${className}`}>
      {children}
    </div>
  )
}
