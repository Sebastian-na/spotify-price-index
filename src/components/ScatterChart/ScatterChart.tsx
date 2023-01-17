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
  TooltipModel
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

interface Props {
  data: ChartData<'scatter'>
  title?: string
  xLabel?: string
  yLabel?: string
  tooltipTitleCallback?: (tooltipItems: Array<TooltipItem<'scatter'>>) => string
  tooltipLabelCallback?: (context: TooltipItem<'scatter'>) => string
  externalTooltipHandler?: (context: { chart: ChartJS<'scatter'>, tooltip: TooltipModel<'scatter'> }) => void
  yTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
  xTicksCallback?: (tickValue: number | string, index: number, ticks: Tick[]) => string
  pointRadius?: number
  pointHoverRadius?: number
  pointHitRadius?: number
}

const ScatterChart = ({
  data, title, xLabel, yLabel,
  tooltipLabelCallback, tooltipTitleCallback,
  yTicksCallback, xTicksCallback, externalTooltipHandler,
  pointRadius = 3, pointHoverRadius = 5, pointHitRadius = 5
}: Props) => {
  const options: ChartOptions<'scatter'> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: !!title,
        text: title
      },

      // fomatting the tooltip
      tooltip: {
        external: externalTooltipHandler,
        enabled: externalTooltipHandler == null,
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
          callback: (yTicksCallback != null)
            ? yTicksCallback
            : function (value, index, ticks) {
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
          callback: (xTicksCallback != null)
            ? xTicksCallback
            : function (value, index, ticks) {
              return ChartJS.defaults.scales.category.ticks.callback.apply(this, [value, index, ticks])
            }
        }
      }
    },
    elements: {
      point: {
        radius: pointRadius,
        hoverRadius: pointHoverRadius,
        hitRadius: pointHitRadius
      }
    }
  }
  return (
        <Scatter data={data} options={options} />
  )
}

export default ScatterChart
