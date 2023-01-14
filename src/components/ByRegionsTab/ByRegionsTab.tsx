import classes from './ByRegionsTab.module.css'
import { useEffect, useMemo, useState } from 'react'
import { getSpotifyPriceIndexDividedByRegions } from '../../services/spotifyPriceIndex'
import RegionData from '../../interfaces/RegionData'
import { ChartOptions } from 'chart.js'
import VerticalBarChart from '../VerticalBarChart/VerticalBarChart'

const regionsColors = {
    "Americas": "#E608EB",
    "Europe": "#08B4EB",
    "Asia": "#EBD408",
    "Oceania": "#6C08EB",
}

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
            const options: ChartOptions = {
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: `Spotify Price on ${region.name}`,

                    },
                    // fomatting the tooltip
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.label}: ${formatter.format(context.parsed.y)}`
                            }
                        }
                    }
                },
            }

            regions.push({
                name: region.name,
                data: data.map(country => country.convertedPrice),
                labels: data.map(country => country.internationalName),
                backgroundColor: (regionsColors as any)[region.name],
                options
            })
        }
        return regions
    }, [data])

    return (
        <div className={classes.sectionsContainer}>
            <div className={classes.chartsContainer}>
                {transformedData.map(region => (
                    <div key={region.name} className={classes.chartContainer}>
                        <VerticalBarChart data={{ labels: region.labels, datasets: [{ label: region.name, data: region.data, backgroundColor: region.backgroundColor }] }} options={region.options}></VerticalBarChart>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ByRegionsTab