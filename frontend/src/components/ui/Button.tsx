import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', children, ...rest }: Props){
  return (
    <button className={`btn ${variant}`} {...rest}>{children}</button>
  )
}
