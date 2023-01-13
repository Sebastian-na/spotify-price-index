import React from 'react'
import './Button.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className='button' {...props}>{children}</button>
  )
}

export default Button