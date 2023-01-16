import classes from './ByRegionsTab.module.css'
import { useEffect, useMemo, useState } from 'react'
import { getSpotifyPriceIndexDividedByRegions } from '../../services/spotifyPriceIndex'
import RegionData from '../../interfaces/RegionData'
import VerticalBarChart from '../VerticalBarChart'
import { regionsColors } from '../../consts/regionsColors'
import Typography from '../Typography/Typography'
import { TooltipItem } from 'chart.js'

const ByRegionsTab = () => {
    const [data, setData] = useState<Map<string, RegionData>>()

    useEffect(() => {
        getSpotifyPriceIndexDividedByRegions().then(data => setData(data))
    }, [])

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    // Each region sorted by price in descending order and with additional attributes for the chart
    const transformedData = useMemo(() => {
        if (!data) return []
        const regionsIterator = data.values()
        const regions = []
        for (let region of regionsIterator) {
            const data = region.countries.sort((a, b) => b.convertedPrice - a.convertedPrice)
            regions.push({
                name: region.name,
                data: data.map(country => country.convertedPrice),
                labels: data.map(country => country.internationalName),
                backgroundColor: (regionsColors as any)[region.name],
            })
        }
        return regions
    }, [data])

    const tooltipLabelCallback = (context: TooltipItem<"bar">) => {
        const price = context.parsed.y
        return `${formatter.format(price)}`
    }

    const ticksCallback = (value: string | number) => {
        return formatter.format(value as number)
    }


    return (
        <div>
            <Typography component='h2' variant='h3' animated>By Regions</Typography>
            <Typography variant='body1' animated mt={20}>
                This section shows the price of Spotify in each region sorted by price in descending order.
                Hover over the bars to see the price and the country.
            </Typography>
            <div className={classes.chartsContainer}>
                {transformedData.map(region => (
                    <div key={region.name} className={classes.chartContainer}>
                        <VerticalBarChart
                            data={{
                                labels: region.labels,
                                datasets: [{
                                    label: region.name, data: region.data, backgroundColor: region.backgroundColor
                                }]
                            }}
                            title={`Spotify Price on ${region.name}`}
                            xLabel='Country'
                            yLabel='Price'
                            tooltipLabelCallback={tooltipLabelCallback}
                            yTicksCallback={ticksCallback}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ByRegionsTab