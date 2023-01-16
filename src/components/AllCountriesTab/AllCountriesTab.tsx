import { useEffect, useMemo, useState } from 'react'
import RegionData from '../../interfaces/RegionData'
import { getSpotifyPriceIndexDividedByRegions } from '../../services/spotifyPriceIndex'
import ScatterChart from '../ScatterChart'
import classes from './AllCountriesTab.module.css'
import { regionsColors } from '../../consts/regionsColors'
import Typography from '../Typography/Typography'
import { externalTooltipHandler, ticksCallback } from './utils'

const AllCountriesTab = () => {
    const [data, setData] = useState<Map<string, RegionData>>()

    useEffect(() => {
        getSpotifyPriceIndexDividedByRegions().then(data => setData(data))
    }, [])

    const transformedData = useMemo(() => {
        if (!data) return []
        const datasets: Array<{ label: string, data: Array<{ x: number, y: number, country: string }>, backgroundColor: string }> = []
        const regionsIterator = data.values()
        for (let region of regionsIterator) {
            const data = []
            for (let country of region.countries) {
                if (!country.gdp) {
                    continue
                }
                data.push({
                    x: country.gdp,
                    y: country.convertedPrice,
                    country: country.internationalName
                })
            }
            datasets.push({
                label: region.name,
                data,
                backgroundColor: (regionsColors as any)[region.name],
            })
        }
        return datasets

    }, [data])

    return (
        <div>
            <Typography component='h2' variant='h3' animated>All Countries</Typography>
            <Typography variant='body1' animated mt={20}>
                This section shows the price of Spotify in all countries in the world
                and the GDP of each country. In the scatter chart, the x-axis is the GDP,
                and the y-axis is the price. The color of each point is the region of the country.
                Hover over the point to see the country name, region, price, and GDP.
            </Typography>
            <div className={classes.chartContainer}>
                <ScatterChart
                    data={{
                        datasets: transformedData
                    }}
                    title='Spotify Price on All Countries'
                    externalTooltipHandler={externalTooltipHandler}
                    xLabel='GDP'
                    yLabel='Price'
                    xTicksCallback={ticksCallback}
                    yTicksCallback={ticksCallback}
                    pointRadius={2}
                    pointHoverRadius={7}
                    pointHitRadius={2}
                />
            </div>
        </div >
    )
}

export default AllCountriesTab