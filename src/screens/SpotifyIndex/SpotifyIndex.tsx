import classes from './SpotifyIndex.module.css'
import ByRegionsTab from '../../components/ByRegionsTab'
import { useState } from 'react'
import TabPanel from '../../components/TabPanel'
import Tab from '../../components/Tab'
import Tabs from '../../components/Tabs'
import Button from '../../components/Button'
import RegionAverageTab from '../../components/RegionAverageTab'
import AllCountriesTab from '../../components/AllCountriesTab'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInOut } from '../../consts/fadeInOutAnimation'

const SpotifyIndex = () => {
  const [tab, setTab] = useState(0)
  const navigate = useNavigate()

  const handleOnChange = (newValue: number) => {
    setTab(newValue)
  }

  return (
        <motion.div variants={fadeInOut} initial='initial' animate='animate' exit='exit'>
            <div className={classes.superContainer}>
                <Button onClick={() => { navigate('/') }} className={classes.goBack}><span className="material-symbols-outlined">undo</span></Button>
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
        </motion.div>
  )
}

export default SpotifyIndex
