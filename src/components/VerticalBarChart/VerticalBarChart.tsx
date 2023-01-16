import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    TooltipItem,
    Tick,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface VerticalBarChartProps {
    data: ChartData<"bar">
    title?: string
    xLabel?: string
    yLabel?: string
    tooltipTitleCallback?: (tooltipItems: TooltipItem<"bar">[]) => string
    tooltipLabelCallback?: (context: TooltipItem<"bar">) => string
    yTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
    xTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data, title, xLabel, yLabel, yTicksCallback, xTicksCallback, tooltipLabelCallback, tooltipTitleCallback }) => {
    const options: ChartOptions<"bar"> = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                text: title,
                display: title ? true : false,
            },
            // fomatting the tooltip
            tooltip: {
                callbacks: {
                    label: tooltipLabelCallback,
                    title: tooltipTitleCallback
                }
            },
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
                        //Call default callback
                        return ChartJS.defaults.scales.category.ticks.callback.apply(this, [value, index, ticks])
                    }
                }
            },
        },
    }

    return (
        <Bar data={data} options={options} style={{ display: "initial" }} />
    )
}

export default VerticalBarChart