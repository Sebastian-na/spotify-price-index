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
  Tick
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  data: ChartData<'bar'>
  title?: string
  xLabel?: string
  yLabel?: string
  tooltipTitleCallback?: (tooltipItems: Array<TooltipItem<'bar'>>) => string
  tooltipLabelCallback?: (context: TooltipItem<'bar'>) => string
  yTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
  xTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
}

const VerticalBarChart = ({ data, title, xLabel, yLabel, yTicksCallback, xTicksCallback, tooltipLabelCallback, tooltipTitleCallback }: Props) => {
  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        text: title,
        display: !!title
      },
      // fomatting the tooltip
      tooltip: {
        callbacks: {
          label: tooltipLabelCallback,
          title: tooltipTitleCallback
        }
      }
    },
    scales: {
      y: {
        title: {
          text: yLabel,
          display: !!yLabel
        },
        ticks: {
          callback: yTicksCallback ?? function (value, index, ticks) {
            return ChartJS.defaults.scales.category.ticks.callback.apply(this, [value, index, ticks])
          }
        }
      },
      x: {
        title: {
          text: xLabel,
          display: !!xLabel
        },
        ticks: {
          callback: xTicksCallback ?? function (value, index, ticks) {
            // Call default callback
            return ChartJS.defaults.scales.category.ticks.callback.apply(this, [value, index, ticks])
          }
        }
      }
    }
  }

  return (
        <Bar data={data} options={options} style={{ display: 'initial' }} />
  )
}

export default VerticalBarChart
