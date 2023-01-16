import { TooltipItem } from 'chart.js'
import { useEffect, useMemo, useState } from 'react'
import RegionData from '../../interfaces/RegionData'
import { getSpotifyPriceIndexDividedByRegions } from '../../services/spotifyPriceIndex'
import ScatterChart from '../ScatterChart'
import classes from './AllCountriesTab.module.css'
import { regionsColors } from '../../consts/regionsColors'
import Typography from '../Typography/Typography'

const AllCountriesTab = () => {
    const [data, setData] = useState<Map<string, RegionData>>()
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

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

    const tooltipLabelCallback = (context: TooltipItem<"scatter">) => {
        const gdp = context.parsed.x
        const price = context.parsed.y
        return `Price: ${formatter.format(price)} GDP: ${formatter.format(gdp)}`
    }

    const tooltipTitleCallback = (tooltipItems: TooltipItem<"scatter">[]) => {
        const country = (tooltipItems[0].raw as any).country as string
        const region = tooltipItems[0].dataset.label
        return `${country} (${region})`
    }

    const ticksCallback = (tickValue: number | string) => {
        return formatter.format(tickValue as number)
    }


    return (
        <div>
            <Typography component='h2' variant='h3' animated>All Countries</Typography>
            <Typography variant='body1' animated mt={20}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
                nostrum sequi vero. Accusantium eligendi mollitia voluptatem error,
                ex facere expedita voluptatum fugiat quia doloribus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
            </Typography>
            <div className={classes.chartContainer}>
                <ScatterChart
                    data={{
                        datasets: transformedData
                    }}
                    title='Spotify Price on All Countries'
                    tooltipLabelCallback={tooltipLabelCallback}
                    tooltipTitleCallback={tooltipTitleCallback}
                    xLabel='GDP'
                    yLabel='Price'
                    xTicksCallback={ticksCallback}
                    yTicksCallback={ticksCallback}
                />
            </div>
        </div >
    )
}

export default AllCountriesTab