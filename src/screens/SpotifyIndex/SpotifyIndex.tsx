import classes from "./SpotifyIndex.module.css"
import ByRegionsTab from "../../components/ByRegionsTab/ByRegionsTab"
import { useState } from "react"
import TabPanel from "../../components/TabPanel/TabPanel"
import Tab from "../../components/Tab/Tab"
import Tabs from "../../components/Tabs/Tabs"
import RegionAverageTab from "../../components/RegionAverageTab/RegionAverageTab"
import AllCountriesTab from "../../components/AllCountriesTab/AllCountriesTab"

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
                <Tab>All Countries</Tab>
            </Tabs>
            <div className={classes.tabPanelContainer}>
                <TabPanel value={tab} index={0}>
                    <ByRegionsTab />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <RegionAverageTab />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <AllCountriesTab />
                </TabPanel>
            </div>
        </div>
    )
}

export default SpotifyIndex