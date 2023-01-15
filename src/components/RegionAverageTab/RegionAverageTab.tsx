import { useEffect, useMemo, useState } from 'react'
import { getAverageSpotifyPriceByRegions } from '../../services/spotifyPriceIndex'
import VerticalBarChart from '../VerticalBarChart'
import classes from './RegionAverageTab.module.css'
import { regionsColors } from '../../consts/regionsColors'
import Typography from '../Typography/Typography'

const RegionAverageTab = () => {
    const [averages, setAverages] = useState<Map<string, number>>()
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

    useEffect(() => {
        getAverageSpotifyPriceByRegions().then((data) => {
            setAverages(data)
        })
    }, [])

    const transformedData = useMemo(() => {
        if (!averages) return []
        const datasets = []
        const arr = Array.from(averages.entries()).sort((a, b) => b[1] - a[1])
        for (let [region, average] of arr) {
            datasets.push({
                label: region,
                data: [average],
                backgroundColor: (regionsColors as any)[region],
            })
        }
        //sort by price in descending order
        return datasets
    }, [averages])

    return (
        <div>
            <Typography component='h2' variant='h3' animated>Region Average</Typography>
            <Typography variant='body1' mt={20} animated >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
                nostrum sequi vero. Accusantium eligendi mollitia voluptatem error,
                ex facere expedita voluptatum fugiat quia doloribus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
                nostrum sequi vero. Accusantium eligendi mollitia voluptatem error,
                ex facere expedita voluptatum fugiat quia doloribus.</Typography>
            <div className={classes.chartContainer}>
                <VerticalBarChart
                    data={{
                        labels: [''],
                        datasets: transformedData
                    }}
                    tooltipLabelCallback={(context) => {
                        return `${formatter.format(context.parsed.y)}`
                    }}
                    tooltipTitleCallback={(tooltipItems) => {
                        return tooltipItems[0].dataset.label!
                    }}
                    yLabel='Price'
                    xLabel='Region'
                    title='Average Spotify Price in each Region'
                />
            </div>
        </div>
    )
}

export default RegionAverageTab