import React from 'react'
import classes from './Tab.module.css'

interface Props {
  children: string
}

const Tab: React.FC<Props> = ({ children }) => {
  return (
        <div className={classes.tab}>{children}</div>
  )
}

export default Tab
