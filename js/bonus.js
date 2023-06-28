//start of bonus.js
console.log("Testing connection with bonus");

//view plotly.js gallery for gauge
function buildGauge(wfreq) {

let gaugeData = [
    {
        domain: {x: [0,1], y: [0,1]},
        value: wfreq,
        title: {text: "Belly Button Washing Frequency <br> Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 10]},
            steps: [

                {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
            ],
            bar: { color: "red"},
        },
    }
];

var gaugeLayout = {width: 600, height: 500, margin: {t:0, b:0 }};
Plotly.newPlot('gauge', gaugeData, gaugeLayout);

};