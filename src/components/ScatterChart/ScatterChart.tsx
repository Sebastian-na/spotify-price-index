import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    TooltipItem,
    Tick,
    TooltipModel,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
    data: ChartData<"scatter">
    title?: string
    xLabel?: string
    yLabel?: string
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"scatter">[]) => string
    tooltipLabelCallback?: (context: TooltipItem<"scatter">) => string
    yTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
    xTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
    pointRadius?: number
    pointHoverRadius?: number
    pointHitRadius?: number
}

const ScatterChart: React.FC<Props> = ({
    data, title, xLabel, yLabel,
    tooltipLabelCallback, tooltipTitleCallback,
    yTicksCallback, xTicksCallback,
    pointRadius = 3, pointHoverRadius = 5, pointHitRadius = 5 }) => {
    const options: ChartOptions<"scatter"> = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: title ? true : false,
                text: title,
            },

            // fomatting the tooltip
            tooltip: {
                callbacks: {
                    label: tooltipLabelCallback,
                    title: tooltipTitleCallback
                },

            }
        },
        scales: {
            y: {
                title: {
                    text: yLabel,
                    display: yLabel ? true : false
                },
                ticks: {
                    callback: yTicksCallback ? yTicksCallback : function (value, index, ticks) {
                        return ChartJS.defaults.scales.category.ticks.callback.apply(this, [value, index, ticks])
                    }
                }
            },
            x: {
                title: {
                    text: xLabel,
                    display: xLabel ? true : false
                },
                ticks: {
                    callback: xTicksCallback ? xTicksCallback : function (value, index, ticks) {
                        return ChartJS.defaults.scales.category.ticks.callback.apply(this, [value, index, ticks])
                    }
                }
            }
        },
        elements: {
            point: {
                radius: pointRadius,
                hoverRadius: pointHoverRadius,
                hitRadius: pointHitRadius,
            }
        },
    }
    return (
        <Scatter data={data} options={options} />
    )
}

export default ScatterChart