import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import getStackedChartData, {Props} from "../../util/getStackedChartData";
import Container from "../../vanilla/Container";
import getBarChartOptions from "../../util/getBarChartOptions";
import React from "react";
import {AILO_BAR_CHART_SEGMENT_COLORS} from "../colors";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Totals = {
    [xAxis: string]: {
        total: number;
        lastSegment: number | null;
    };
};


export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Ailo Bar Chart - Stacked',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

export default (props: Props) => {
    const datasetsMeta = {
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        barThickness: 'flex',
        minBarLength: 0,
        borderRadius: 5,
    };

    props.customisedSegmentColors = AILO_BAR_CHART_SEGMENT_COLORS;

    if (props.showTotals) {
        const totals: Totals = {};
        const { data } = props.results;
        const { metric, xAxis, segment } = props;
        if (data && data.length > 0) {
            data?.forEach((d: { [key: string]: any }) => {
                const x = d[xAxis.name];
                const y = parseFloat(d[metric.name]);
                if (totals[x]) {
                    totals[x].total += y;
                    totals[x].lastSegment = null;
                } else {
                    totals[x] = {
                        total: y,
                        lastSegment: null, // we'll fill this in later
                    };
                }
            });
            props.totals = totals;
        }
    }

    return (
        <Container {...props} className="overflow-y-hidden">
            <Bar
                height="100%"
                options={getBarChartOptions({ ...props, legendPosition: 'top', stacked: props.stackBars })}
                data={
                    getStackedChartData(props, datasetsMeta) as ChartData<'bar', number[], unknown>
                }
            />
        </Container>
);
}