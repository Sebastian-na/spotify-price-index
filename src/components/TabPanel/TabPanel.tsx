import React from 'react'

interface Props {
    children: React.ReactNode
    value: number
    index: number
}

const TabPanel: React.FC<Props> = ({ value, index, children }) => {
    return (
        <div hidden={value !== index}>
            {children}
        </div>
    )
}

export default TabPanel