
apiKey = "n8ytM4yxbemwLYG_yrRa";

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

function getMonthlyData(sample) {

  var queryUrl = `https://www.quandl.com/api/v3/datasets/EOD/${sample}?start_date=2018-01-01&end_date=2020-01-01&collapse=monthly&api_key=n8ytM4yxbemwLYG_yrRa`;
  d3.json(queryUrl).then(function(data) {
    var dates = unpack(data.dataset.data, 0);
    var openPrices = unpack(data.dataset.data, 1);
    var highPrices = unpack(data.dataset.data, 2);
    var lowPrices = unpack(data.dataset.data, 3);
    var closingPrices = unpack(data.dataset.data, 4);
    var volume = unpack(data.dataset.data, 5);
    buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume);
  });
}

function buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume) {
  var table = d3.select("#summary-table");

  var tbody = table.select("tbody");
      /// clear div
      tbody.html("");
  var trow;
  ///trow.html("");
  for (var i = 0; i < 12; i++) {
    trow = tbody.append("tr");
    trow.append("td").text(dates[i]);
    trow.append("td").text(openPrices[i]);
    trow.append("td").text(highPrices[i]);
    trow.append("td").text(lowPrices[i]);
    trow.append("td").text(closingPrices[i]);
    trow.append("td").text(volume[i]);
  }
}



















/// Create metadata panel
function create_metadata(sample) {

  
    /// Grab data from route and select div #sample-metadata
    d3.json(`/metadata/${sample}`).then(function(sample){
      var metaSample = d3.select(`#sample-metadata`).html(""); 
    /// clear div
    metaSample.html("");
    /// Use `Object.entries` to push data into div
      Object.entries(sample).forEach(function([key,value]){
        var new_p = metaSample.append("p");
        new_p.text(`${key}:${value}`)
      })
    });
}






/// Create stock chart

sample = "ABEO"
create_viz(sample) 

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

/**

 * @param {array} rows
 * @param {integer} index
 */

function create_viz(sample) {
      // Calculate a rolling average for an array
 function rollingAverage(arr, windowPeriod = 10) {
    // rolling averages array to return
    var averages = [];

    // Loop through all of the data
    for (var i = 0; i < arr.length - windowPeriod + 1; i++) {
      // calculate the average for a window of data
      var sum = 0;
      for (var j = 0; j < windowPeriod; j++) {
        sum += arr[i + j];
      }
      // calculate the average and push it to the averages array
      averages.push(sum / windowPeriod);
    }
    return averages;
}

    vizData = `https://www.quandl.com/api/v3/datasets/EOD/${sample}?start_date=2018-01-01&end_date=2020-01-01&api_key=n8ytM4yxbemwLYG_yrRa`;
    d3.json(vizData).then(function(data){
      
   
    // Grab values from the response json object to build the plots
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    var dates = unpack(data.dataset.data, 0);
    var openingPrices = unpack(data.dataset.data, 1);
    var highPrices = unpack(data.dataset.data, 2);
    var lowPrices = unpack(data.dataset.data, 3);
    var closingPrices = unpack(data.dataset.data, 4);
    var rollingPeriod = 30;
    var rollingAvgClosing = rollingAverage(closingPrices, rollingPeriod);
    getMonthlyData(sample);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: "Price",
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    // Candlestick Trace
    var trace2 = {
      type: "candlestick",
      x: dates,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices
    };

    // Rolling Averages Trace
    var trace3 = {
      type: "scatter",
      mode: "lines",
      name: "Rolling",
      x: dates.slice(0, dates.length - rollingPeriod),
      y: rollingAvgClosing
    };

    var data = [trace1, trace2, trace3];

    var layout = {
      title: `${stock} Closing Prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date",
        legend: {"orientation": "h"}
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);
  





/**

 * @param {array} rows
 * @param {integer} index

 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Calculate a rolling correlation for two arrays
function rollingCorrelation(arr1, arr2, windowPeriod = 10) {
  // correlation array to return
  var corrs = [];
  for (var i = 0; i < arr1.length - windowPeriod; i++) {
    // windows of data to perform correlation on
    var win1 = [];
    var win2 = [];
    for (var j = 0; j < windowPeriod; j++) {
      win1.push(arr1[i + j]);
      win2.push(arr2[i + j]);
    }
    // calculate correlation between two arrays
    corrs.push(ss.sampleCorrelation(win1, win2));
  }
  return corrs;
}





function buildPlot(stock1, stock2) {

  var url1 = `https://www.quandl.com/api/v3/datasets/EOD/${stock1}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=n8ytM4yxbemwLYG_yrRa`;
  var url2 = `https://www.quandl.com/api/v3/datasets/EOD/${stock2}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=n8ytM4yxbemwLYG_yrRa`;

  Plotly.d3.json(url1, function(err1, response1) {

    if (err1) return console.warn(err1);

    Plotly.d3.json(url2, function(err2, response2) {
      if (err2) return console.warn(err2);

      // Grab values from the response json object to build the plots
      var name1 = response1.dataset.name;
      var name2 = response2.dataset.name;
      var stock1 = response1.dataset.dataset_code;
      var stock2 = response2.dataset.dataset_code;
      var dates = unpack(response1.dataset.data, 0);
      var closingPrices1 = unpack(response1.dataset.data, 1);
      var closingPrices2 = unpack(response2.dataset.data, 1);

      var period = 10;
      var corrs = rollingCorrelation(closingPrices1, closingPrices2, period);
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: `${name1} vs ${name2}`,
        x: dates.slice(period),
        y: corrs,
        line: {
          color: "#17BECF"
        }
      };

      var data = [trace1];

      var layout = {
        title: `${stock1} ${stock2} Correlation Plot`,
        xaxis: {
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };

      Plotly.newPlot("corplot", data, layout);

    });

  });
}

// Add event listener for submit button


buildPlot("ABMD","LBRDA");

var elem = document.getElementById('animals');
var currElem = document.getElementById('current');




currElem.innerHTML = elem.value;

animals.onchange = function(e) {
   currElem.innerHTML = e.target.value;
   stockie= currElem.innerHTML


   buildPlot(stockie,stockiet);


}


var elemt = document.getElementById('animalst');
var currElemt = document.getElementById('currentt');


animalst.onchange = function(a) {
   currElemt.innerHTML = a.target.value;
   stockiet= currElemt.innerHTML





   buildPlot(stockie,stockiet);

}
  

buildPlot(stockie,stockiet);







  });
}






function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  /// Populate the select options
  d3.json("/names").then((sampleNames) => {sampleNames.forEach((sample) => {selector.append("option").text(sample).property("value", sample);});

    /// Plpt first sample
    create_viz(sampleNames[0]);
    create_metadata(sampleNames[0]);
    getMonthlyData(sampleNames[0]);
  });
}




function refresh_data(newSample) {
  // Fetch new data when drop down menu is used
  create_viz(newSample);
  create_metadata(newSample);
  getMonthlyData(newSample);
}


init();