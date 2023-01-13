import { useLoaderData } from "react-router-dom"
import classes from "./SpotifyIndex.module.css"
import { LoaderData } from "./SpotifyIndexLoader"
import VerticalBarChart from "../../components/VerticalBarChart/VerticalBarChart"
import { useMemo } from "react"
import { ChartOptions } from "chart.js"

const SpotifyIndex = () => {
    const { data } = useLoaderData() as LoaderData
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    // Each region sorted by price in descending order and with additional attributes for the chart
    const transformedData = useMemo(() => {
        const regionsIterator = data.values()
        const regions = []
        for (let region of regionsIterator) {
            const data = region.countries.sort((a, b) => b.convertedPrice - a.convertedPrice)
            const options: ChartOptions = {
                responsive: true,
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
                backgroundColor: "#1ED760",
                options
            })
        }
        return regions
    }, [data])

    return (
        <div className={classes.container}>
            {transformedData.map(region => (
                <VerticalBarChart key={region.name} data={{ labels: region.labels, datasets: [{ label: region.name, data: region.data, backgroundColor: region.backgroundColor }] }} options={region.options}></VerticalBarChart>
            ))}
        </div>

    )
}

export default SpotifyIndex