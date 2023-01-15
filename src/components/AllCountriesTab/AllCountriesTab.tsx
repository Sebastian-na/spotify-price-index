import { ChartOptions } from 'chart.js'
import { useEffect, useMemo, useState } from 'react'
import RegionData from '../../interfaces/RegionData'
import { getSpotifyPriceIndexDividedByRegions } from '../../services/spotifyPriceIndex'
import ScatterChart from '../ScatterChart/ScatterChart'
import classes from './AllCountriesTab.module.css'
import { regionsColors } from '../../consts/regionsColors'

const AllRegionsTab = () => {
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

    const options: ChartOptions<"scatter"> = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Spotify Price on All Countries`,
            },

            // fomatting the tooltip
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const gdp = context.parsed.x
                        const price = context.parsed.y

                        return `Price: ${formatter.format(price)} GDP: ${formatter.format(gdp)}`
                    },
                    title: (context) => {
                        const country = (context[0].raw as any).country as string
                        const region = context[0].dataset.label
                        return `${country} (${region})`
                    }
                },

            }
        },
        scales: {
            y: {
                title: {
                    text: "Price",
                    display: true
                },
                ticks: {
                    callback: (value) => {
                        return formatter.format(value as number)
                    }
                }
            },
            x: {
                title: {
                    text: "GDP",
                    display: true
                },
                ticks: {
                    callback: (value) => {
                        return formatter.format(value as number)
                    }
                }
            }
        },
        elements: {
            point: {
                radius: 3,
                hoverRadius: 8,
                hitRadius: 6
            }
        },
    }


    return (
        <div>
            <h2 className={classes.title}>All Countries</h2>
            <p className={classes.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
                nostrum sequi vero. Accusantium eligendi mollitia voluptatem error,
                ex facere expedita voluptatum fugiat quia doloribus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
            </p>
            <div className={classes.chartContainer}>
                <ScatterChart
                    data={{
                        datasets: transformedData
                    }}
                    options={options} />
            </div>
        </div >
    )
}

export default AllRegionsTab