import React from 'react'
import classes from './Button.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className={classes.button} {...props}>{children}</button>
  )
}

export default Button