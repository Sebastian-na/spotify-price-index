import React from 'react'
import classes from './TabPanel.module.css'

interface Props {
    children: React.ReactNode
    value: number
    index: number
}

const TabPanel: React.FC<Props> = ({ value, index, children }) => {
    return (
        <div className={`${classes.tabPanel} ${value == index ? classes.selected : ''}`} >
            {value === index && children}
        </div>
    )
}

export default TabPanel