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
    data: ChartData<"bar", (number | [number, number] | null)[], unknown>
    options?: ChartOptions
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data, options }) => {
    return (
        <Bar data={data} options={options} style={{ display: "initial" }} />
    )
}

export default VerticalBarChart