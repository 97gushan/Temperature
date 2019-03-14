const influx = require("influx");




module.exports = {
    /**
     * Get the temperature from now - time, the temperature is given as the mean of every 5 minutes.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {string} time The start of the interval. 1d = 1 day ago, 1h = 1 hour ago.
     */
    getTemperature : function(req, res, next, time){
        const db = new influx.InfluxDB({
            host: "192.168.1.10",
            database: "temperature"
        })
        
        db.query("SELECT MEAN(temperature) FROM measuredTemp WHERE time > now() - "+ time +"  GROUP BY time(5m)").then(data => {
            res.send(data);
        }).catch(error => {
            console.error(error);
        });
        
    }, 
    /**
     * 
     * Fetch the latest inserted value from the db
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getCurrentTemperature : function(req, res, next){
        const db = new influx.InfluxDB({
            host: "192.168.1.10",
            database: "temperature"
        })
        
        db.query("SELECT temperature FROM measuredTemp ORDER BY time DESC LIMIT 1").then(data => {
            res.send(data);
        }).catch(error => {
            console.error(error);
        });
    }

};

