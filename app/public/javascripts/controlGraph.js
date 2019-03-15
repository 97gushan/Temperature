

const CURRENT_TEMP_TIMER = 1000;
const GRAPH_TIMER = 1000*30;
const X_AXIS_WIDTH = 6000;


/**
 * Starts a interval to update the graph every 30 second.
 */
function startGraphInterval(){

    setInterval(function(){
        getTemperature();
    }, GRAPH_TIMER);
}

/**
 * Starts a interval to update the current temp div every second.
 */
function startCurrentTempInterval(){
    setInterval(function(){
        getCurrentTemp();
    }, CURRENT_TEMP_TIMER);
}

/**
 * Get a temp interval from the the API with a getJSON call
 */
function getTemperatureInterval(){
    $.getJSON("api/getTempInterval", function(tempJson){
        updateGraph(tempJson);
    });

}

/**
 * Get the temp from the the API with a getJSON call
 */
function getTemperature(){

    $.getJSON("api/getTemp", function(tempJson){
        updateGraph(tempJson);
    });

}

/**
 * Get the current temp from the the API with a getJSON call
 */
function getCurrentTemp(){

    $.getJSON("api/getCurrentTemp", function(tempJson){
        updateCurrentTemp(tempJson[0].temperature);
    });

}

/**
 * Updates the currentTemp div with a new value
 * @param {number} value The current value that should be displayed on screen 
 */
function updateCurrentTemp(value){
    if(value != null){
        $("#currentTemp").text(value.toFixed(1));
    }
}

/**
 * Updates the graph with a list of values
 * @param {JSON} values JSON array where every element in the values array is an JSON object with the values mean and time  
 */
function updateGraph(values){
    
    values.forEach(value => {
        if(value != null){
            addPoint(value.mean, new Date(value.time));

        }
    });
}


/**
 * Add a point to the graph with value on the y-axis and time on the x-axis
 * @param {number} value 
 * @param {Date} time 
 */
function addPoint(value, time){

    // if the amount of data increases beyond the limit, set the flag to 1 so 
    // the first element in the graph is removed on insertion of new values
    chart.data.length > X_AXIS_WIDTH ? removeFlag = 1 : removeFlag = 0;
 

    chart.addData({
        date: time,
        temp: value
    }, removeFlag );
        
    
}

function main(){

    getCurrentTemp();

    getTemperatureInterval();
                
    startGraphInterval();
    startCurrentTempInterval();
}

$(document).ready(function(){
        
    main();
    
});
