
// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

// Themes end

// Create chart instance
var chart = am4core.create("chart", am4charts.XYChart);

// Add data
chart.data = [];


// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.startLocation = 5;
dateAxis.endLocation = 0.5;
dateAxis.title.text = "Timestamp";


// Create value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Temperature";

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "temp";
series.dataFields.dateX = "date";

series.strokeWidth = 3;
series.tooltipText = "{valueY.value}";
series.fillOpacity = 0.1;
series.tensionX = 0.8;
series.tensionY = 1;

var rangePositive = valueAxis.createSeriesRange(series);
rangePositive.value = 0;
rangePositive.endValue = 1000;
rangePositive.contents.stroke = am4core.color("#FF0000");
rangePositive.contents.fill = rangePositive.contents.stroke;
rangePositive.contents.strokeOpacity = 0.7;
rangePositive.contents.fillOpacity = 0.2;

// Create a range to change stroke for values below 0
var range = valueAxis.createSeriesRange(series);
range.value = 0;
range.endValue = -1000;
range.contents.stroke = am4core.color("#0000FF");
range.contents.fill = range.contents.stroke;
range.contents.strokeOpacity = 0.7;
range.contents.fillOpacity = 0.2;

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
chart.zoomOutButton.disabled = true;
chart.scrollbarX = new am4core.Scrollbar();

function startInterval(){
    
    let interval = setInterval(function(){
        
        value = getTemperature();
        updateCurrentTemp(value);


        addPoint(value);

    }, 500);
}

function getTemperature(){
    let lastVal = chart.data[chart.data.length-1]["temp"];

        let value = lastVal + ((Math.random()-0.5)/10);
    return value;
}

function updateCurrentTemp(value){
    let currentTempDiv = $("#currentTemp");

    currentTempDiv.text(value.toFixed(1));
}

function addPoint(value){


    if(chart.data.length > 300){
        removeFlag = 1;
    }else{
        removeFlag = 0;
    }
    

    chart.addData({
        date: Date.now(),
        temp: value
    }, removeFlag );
        
    
}

$("body").click(function(){
    addPoint(2*Math.random()-1);
    startInterval();
});
