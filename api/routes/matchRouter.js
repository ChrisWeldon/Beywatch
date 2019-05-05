var express = require("express");
var router  = express.Router();
var mysql = require('mysql');
var sql_config = require('./sql_config.json')

var con = mysql.createConnection(sql_config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.post("/", function(req, res, next){
  console.log(req.body)
});

module.exports = router;
