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
  console.log("recieved form data")
  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Energy Layer" AND beywatch.abstract_stats.abbr= "'+ req.body.el1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Forge Disc" AND beywatch.abstract_stats.abbr= "'+ req.body.fd1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Performance Tip" AND beywatch.abstract_stats.abbr= "'+ req.body.pt1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Energy Layer" AND beywatch.abstract_stats.abbr= "'+ req.body.el2 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Forge Disc" AND beywatch.abstract_stats.abbr= "'+ req.body.fd2 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Performance Tip" AND beywatch.abstract_stats.abbr= "'+ req.body.pt2 +'";', [1,6],function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send(results)
  });
  console.log(req.body)
});

module.exports = router;
