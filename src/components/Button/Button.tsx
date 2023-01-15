import React from 'react'
import classes from './Button.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  className?: string,
}

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={classes.button + ' ' + className} {...props}>{children}</button>
  )
}

export default Button