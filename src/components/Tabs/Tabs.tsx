import React, { BaseSyntheticEvent, useEffect } from 'react'
import Tab from '../Tab/Tab'
import classes from './Tabs.module.css'

interface Props {
    children: React.ReactElement<typeof Tab>[]
    tab: number
    onChange: (newValue: number) => void
}

const Tabs: React.FC<Props> = ({ children, tab, onChange }) => {

    useEffect(() => {
        // Add .selected class to the li at the index of the tab prop
        const lis = document.querySelectorAll('.' + classes.li)
        lis.forEach(li => {
            li.classList.remove(classes.selected)
        })
        lis[tab].classList.add(classes.selected)
    }, [tab])

    function handleOnChange(e: BaseSyntheticEvent) {
        // Add .selected class to the clicked li and remove it from the others
        const lis = document.querySelectorAll('.' + classes.li)

        // notify the parent component of the change passing the index of the clicked li
        onChange(Array.from(lis).indexOf(e.target))
    }

    return (
        <nav className={classes.nav}>
            <ul onChange={handleOnChange}>
                {children.map((child, index) => {
                    return <li className={classes.li} onClick={handleOnChange} key={index}>{child}</li>
                })}
            </ul>
        </nav>
    )
}
export default Tabs