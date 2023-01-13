import React from 'react'
import { Link } from 'react-router-dom'
import './CustomLink.css'

interface Props extends React.LinkHTMLAttributes<HTMLLinkElement> {
    children: React.ReactNode
    to: string
}

const CustomLink: React.FC<Props> = ({ children, to, ...props }) => {
    return (
        <Link className='link' to={to}><span>{children}</span></Link>
    )
}

export default CustomLink