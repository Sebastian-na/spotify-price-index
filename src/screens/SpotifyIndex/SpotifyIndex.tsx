import classes from "./SpotifyIndex.module.css"
import ByRegionsTab from "../../components/ByRegionsTab/ByRegionsTab"
import { useState } from "react"
import TabPanel from "../../components/TabPanel/TabPanel"
import Tab from "../../components/Tab/Tab"
import Tabs from "../../components/Tabs/Tabs"
import Button from "../../components/Button/Button"
import RegionAverageTab from "../../components/RegionAverageTab/RegionAverageTab"
import AllCountriesTab from "../../components/AllCountriesTab/AllCountriesTab"
import { useNavigate } from "react-router-dom"

const SpotifyIndex = () => {
    const [tab, setTab] = useState(0)
    const navigate = useNavigate()

    const handleOnChange = (newValue: number) => {
        setTab(newValue)
    }

    return (
        <div className={classes.superContainer}>
            <Button onClick={() => navigate(-1)} className={classes.goBack}><span className="material-symbols-outlined">undo</span></Button>
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