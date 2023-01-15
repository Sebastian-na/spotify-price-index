import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';
import { Point } from 'chart.js/dist/helpers/helpers.canvas';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
    data: ChartData<"scatter">
    options: ChartOptions<"scatter">
}

const ScatterChart: React.FC<Props> = ({ data, options }) => {
    return (
        <Scatter data={data} options={options} />
    )
}

export default ScatterChart