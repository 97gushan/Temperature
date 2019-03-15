var express = require('express');
var router = express.Router();

const db = require("../database.js");

/* GET home page. */
router.get('/getTemp', function(req, res, next) {

    db.getTemperature(req, res, next, "5m");
});

router.get('/getTempInterval', function(req, res, next) {

    db.getTemperature(req, res, next, "2d");
});

router.get('/getCurrentTemp', function(req, res, next) {

    db.getCurrentTemperature(req, res, next);
});

module.exports = router;
