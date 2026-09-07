import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react'
import { Link } from 'react-router-dom'

type SharedButtonProps = PropsWithChildren<{
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}>

type ButtonAsButton = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
    to?: never
  }

type ButtonAsAnchor = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    to?: never
  }

type ButtonAsLink = SharedButtonProps & {
  to: string
  href?: never
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

const variantClass = {
  primary: 'border-ed-black bg-ed-black text-ed-ivory hover:bg-ed-gold hover:text-ed-black',
  secondary: 'border-ed-gold bg-ed-gold text-ed-black hover:bg-transparent',
  ghost: 'border-ed-border bg-transparent text-ed-black hover:border-ed-black',
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = `button button--${variant} inline-flex min-h-11 items-center justify-center border px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${variantClass[variant]} ${className}`

  if ('to' in props && props.to) {
    return (
      <Link className={classes} to={props.to}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  )
}
