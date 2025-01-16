import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Dimension, Measure, Dataset, DataResponse} from "@embeddable.com/core";
import Loading from "../../util/Loading";
import Error from "../../util/Error";


type Props = {
    ds: Dataset;
    slice: Dimension; // { name, title }
    metric: Measure; // [{ name, title }]
    results: DataResponse; // { isLoading, error, data: [{ <name>: <value>, ... }] }
    showLegend: boolean;
};

const COLORS = [
    '#A9DBB0',
    '#F59E54',
    '#F77A5F',
    '#8FCBCF',
    '#C3B0EA',
];

const chartOptions = (showLegend: boolean) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: showLegend
        }
    },
});

const chartData = (labels: string[] | undefined, counts: number[] | undefined) => {
    return {
        labels,
        datasets: [
            {
                data: counts,
                backgroundColor: COLORS,
                borderColor: COLORS,
            }
        ]
    };
}

export default (props: Props) => {
    const { slice, metric, results, showLegend } = props;
    const { isLoading, data, error } = results;

    if(isLoading) {
        return <Loading />
    }
    if(error) {
        return <Error msg={error}/>;
    }

    /*
    E.g:
            data = [
                { country: "US", count: 23 },
                { country: "UK", count: 10 },
                { country: "Germany", count: 5 },
            ]
            slice = { name: 'country' }
            metric = { name: 'count' }
    */

    // Chart.js pie expects labels like so: ['US', 'UK', 'Germany']
    const labels: string[] |undefined = data?.map(d => d[slice.name] as string);

    // Chart.js pie expects counts like so: [23, 10, 5]
    const counts = data?.map(d => d[metric.name] as number);

    return <Pie options={chartOptions(showLegend)}
                data={chartData(labels, counts)} />
};