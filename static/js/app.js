// start of Bindu's app.js file
//check to see the connection between app.js and index.html
console.log("Testing for connection -- good")

/*
1. Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
*/
// Create variable to store samples.json endpoint stored on Amazon server S3
const sample_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(sample_url).then(function(data) {
    //console.log("This is sample data")
    //console.log(data);

// Note Data is not available below this point
});

// *Build function called buildCharts
// 2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//   Use sample_values as the values for the bar chart.
//   Use otu_ids as the labels for the bar chart.
//   Use otu_labels as the hovertext for the chart.*/



function buildCharts(sample) {
    console.log("testing buildCharts function");
    d3.json(sample_url).then(function(data) {
        console.log("This is sample url data")
        console.log(data);

         //to build the barchart need the samples object
         let samples = data.samples
         //view in console
         console.log(samples);
 

        //filter samples for the given sample(i.e. 940)
        let sampleArray = samples.filter(sampleObject => sampleObject.id == sample)
        //view sampleArray
        console.log(sampleArray);

        //unpack the object within the array
        let sampleResult = sampleArray[0];
        console.log(sampleResult);

        //create variables
        let sample_values = sampleResult.sample_values;
        console.log("These are sample_values");
        console.log(sample_values);

        let otu_ids = sampleResult.otu_ids;
        console.log("This is otu_ids");
        console.log("otu_ids");

        let otu_labels = sampleResult.otu_labels;
        console.log("This is otu_labels");
        console.log("otu_labels");

    /*
    3. Create a bubble chart that displays each sample.

   Use otu_ids for the x values.
   Use sample_values for the y values.
   Use sample_values for the marker size.
   Use otu_ids for the marker colors.
   Use otu_labels for the text values.

    */
        
        // Create trace
       let traceBubble = { 
           x: otu_ids,
           y: sample_values,
           mode: 'markers',
           marker: {
                size: sample_values,
                color:otu_ids,
                colorscale: 'Earth',
           }
        }

        let dataBubble = [traceBubble];

        let layoutBubble = {
            title: "Bacteria in sample",
            showlegend: false,
            xaxis: {title: "OTU ID"},
            yaxis: {title: "sample values"}

        }
        
        //build bubble chart in ,div id="bubble"></div>
        Plotly.newPlot('bubble', dataBubble, layoutBubble);

        //build horizontal bar chart

        /* 
        2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
            Use sample_values as the values for the bar chart.
            Use otu_ids as the labels for the bar chart.
            Use otu_labels as the hovertext for the chart.
        */ 

        let dataBar = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: "h"
        }];
        
        let layoutBar = {
            title: "Top 10 Bacteria in Sample",
        }
              
        //create plot in the <div id="bar"></div>
        Plotly.newPlot('bar', dataBar, layoutBar);
 
    // Note Data is not available below this point
    });
};


/*
4. Display the sample metadata, i.e., an individual's demographic information.
*/

/*
5. Display each key-value pair from the metadata JSON object somewhere on the page.
*/

function buildMetadata(sample) {
    d3.json(sample_url).then(function (data) {
        console.log("This is sample data")
        console.log(data);

        let metadata = data.metadata;
        //view in console
        console.log("This is metadata")
        console.log(metadata);

        //filter samples for the given sample (i.e. 940)
        let metadataArray = metadata.filter(metadataobject => metadataobject.id == sample);

        //view metadataArray
        console.log(metadataArray);

        //unpack the object using indexing
        let metadataResult = metadataArray[0];

        //view in console
        console.log("This is metadataResult")
        console.log(metadataResult);

        //use d3.select() to get <div id="sample-metadata" class="panel-body"></div> from index.html
        //when using id to select "#sample-metadata"
        //assign to a variable

        let metadataPanel = d3.select("#sample-metadata");

        //need to wipe clean the metadataPanel
        //using html("")
        metadataPanel.html("");

        //iterate over each key value pair in metadataResult and append to the metadataPanel
        for (key in metadataResult) {
            metadataPanel.append("h5").text(`${key.toUpperCase()}: ${metadataResult[key]}`);
        }; 

        //call buildGauge function and pass
        buildGauge(metadataResult.wfreq);
})};
/*
6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:
*/

function optionChanged(newSample) {
    //buildcharts
    buildCharts(newSample);

    //update the metadata panel
    buildMetadata(newSample);
};

//create an initial function called init
function init() {
    d3.json(sample_url).then(function (data) {
        //console.log("This is sample data")
        //console.log(data);

        let sampleNames = data.names;
        //view in console
        console.log(sampleNames);

        // populate dropdown menu
        // ref MDN for the select statement
        // add option, value, text for each sampleName
        // use d3.select to get <select id="selDataset" onchange="optionChanged(this.value)"></select>
        let dropdownSelect = d3.select("#selDataset");

        //iterate over each name in sampleNames and option, value, text for each sampleName
        for (let index = 0; index < sampleNames.length; index++) {
            //start with the dropdownSelect and chain
            dropdownSelect
                .append("option")
                .text(sampleNames[index])
                .property("value", sampleNames[index]);
        }

        buildCharts(sampleNames[0]);
        buildMetadata(sampleNames[0])

    })
}
function optionChanged(sample) {
    buildCharts(sample);
    buildMetadata(sample)
}

    // Note Data is not available below this point

    
//create an initial function called initi
// function init() {
//     //call buildCharts function
//     buildCharts(940);

// };
init();