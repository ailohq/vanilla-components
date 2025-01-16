import {defineComponent, EmbeddedComponentMeta, Inputs} from '@embeddable.com/react';
import { loadData } from '@embeddable.com/core';

import Component from './BasicPieComponent';
import {Dataset, Dimension, Measure} from "@embeddable.com/core/lib/loadData";

export const meta = {
    name: 'BasicPieComponent',  // unique name for this component (must match file name)
    label: 'Basic Pie',
    inputs: [   // the inputs the no-code builder user will be asked to enter
        {
            name: "ds", // unique name for this input
            type: "dataset", // tells Embeddable to render a dropdown containing available datasets
            label: "Dataset to display", // human readable name for this input (shown in UI above)
        },
        {
            name: "slice",
            type: "dimension", // renders a dropdown containing available dimensions
            label: "Slice",
            config: {
                dataset: "ds", // only show dimensions from dataset "ds" (defined above)
            },
        },
        {
            name: "metric",
            type: "measure", // renders a dropdown containing available measures
            label: "Metric",
            config: {
                dataset: "ds", //only show measures from dataset "ds" (defined above)
            },
        },
        {
            name: 'showLegend',
            type: 'boolean',
            label: 'Turn on the legend',
            defaultValue: true,
            category: 'Chart settings',
        },
    ]
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
    props: (inputs: Inputs<typeof meta>) => {
        return {
            // pass ds, slice and metric directly to the React component
            ...inputs,
            // request data to populate our chart
            results: loadData({
                from: inputs.ds,
                dimensions: [inputs.slice],
                measures: [inputs.metric],
            })
        };
    }
});