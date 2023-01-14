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
            li.classList.add(classes.unselected)
        })
        lis[tab].classList.add(classes.selected)
        lis[tab].classList.remove(classes.unselected)
    }, [tab])

    function handleOnChange(e: BaseSyntheticEvent) {
        const lis = document.querySelectorAll('.' + classes.li)
        // notify the parent component of the change passing the index of the clicked li
        onChange(Array.from(lis).indexOf(e.target))
    }

    function handleNext() {
        onChange((tab - 1 + children.length) % children.length)
    }

    function handlePrev() {
        onChange((tab + 1) % children.length)
    }



    return (
        <nav className={classes.nav}>
            <span className={`${classes.navigateBefore} material-symbols-outlined`} onClick={handleNext}>
                navigate_before
            </span>
            <ul onChange={handleOnChange}>
                {children.map((child, index) => {
                    return <li className={classes.li} onClick={handleOnChange} key={index}>{child}</li>
                })}
            </ul>
            <span className={`${classes.navigateNext} material-symbols-outlined`} onClick={handlePrev}>
                navigate_next
            </span>
        </nav>
    )
}
export default Tabs