import React from 'react'
import { Link } from 'react-router-dom'
import classes from './CustomLink.module.css'

interface Props extends React.LinkHTMLAttributes<HTMLLinkElement> {
    children: React.ReactNode
    external?: boolean
    to: string
}

const CustomLink: React.FC<Props> = ({ children, to, external = false }) => {
    return (
        external ?
            <a className={classes.link} href={to} target="_blank">{children}</a>
            :
            <Link className={classes.link} to={to}><span>{children}</span></Link>
    )
}

export default CustomLink