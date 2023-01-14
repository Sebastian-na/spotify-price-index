import classes from "./SpotifyIndex.module.css"
import ByRegionsTab from "../../components/ByRegionsTab/ByRegionsTab"
import { useState } from "react"
import TabPanel from "../../components/TabPanel/TabPanel"
import Tab from "../../components/Tab/Tab"
import Tabs from "../../components/Tabs/Tabs"

const SpotifyIndex = () => {
    const [tab, setTab] = useState(0)

    const handleOnChange = (newValue: number) => {
        setTab(newValue)
    }

    return (
        <div className={classes.superContainer}>
            <Tabs tab={tab} onChange={handleOnChange}>
                <Tab>By Regions</Tab>
                <Tab>Region Average</Tab>
                <Tab>All Regions</Tab>
            </Tabs>
            <div className={classes.tabPanelContainer}>
                <TabPanel value={tab} index={0}>
                    <ByRegionsTab />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <div>second tab</div>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <div>third</div>
                </TabPanel>
            </div>
        </div>
    )
}

export default SpotifyIndex