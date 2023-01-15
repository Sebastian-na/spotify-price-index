import { ChartOptions } from 'chart.js'
import { useEffect, useMemo, useState } from 'react'
import { getAverageSpotifyPriceByRegions } from '../../services/spotifyPriceIndex'
import VerticalBarChart from '../VerticalBarChart'
import classes from './RegionAverageTab.module.css'
import { regionsColors } from '../../consts/regionsColors'

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
        console.log(datasets)
        //sort by price in descending order
        return datasets
    }, [averages])

    const options: ChartOptions<"bar"> = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                text: 'Average Spotify Price by Region',
                display: true,
            },
            // fomatting the tooltip
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return `${formatter.format(context.parsed.y)}`
                    }
                }
            },
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
                    text: "Region",
                    display: true
                },
            },
        }
    }

    return (
        <div>
            <h2 className={classes.title}>Region Average</h2>
            <p className={classes.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
                nostrum sequi vero. Accusantium eligendi mollitia voluptatem error,
                ex facere expedita voluptatum fugiat quia doloribus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere architecto voluptatem maxime? Tenetur inventore earum
                nostrum sequi vero. Accusantium eligendi mollitia voluptatem error,
                ex facere expedita voluptatum fugiat quia doloribus.</p>
            <div className={classes.chartContainer}>
                <VerticalBarChart
                    data={{
                        labels: [''],
                        datasets: transformedData
                    }}
                    options={options} />
            </div>
        </div>
    )
}

export default RegionAverageTab