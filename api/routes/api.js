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
  for(var v in req.body){
    if(v.includes("'") || v.includes(".") || v.includes("\"") || v.includes("FROM") || v.includes("DELETE")){
      res.redirect("/")
    }
  }
  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Energy Layer" AND beywatch.abstract_stats.abbr= "'+ req.body.el1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Forge Disc" AND beywatch.abstract_stats.abbr= "'+ req.body.fd1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Performance Tip" AND beywatch.abstract_stats.abbr= "'+ req.body.pt1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Energy Layer" AND beywatch.abstract_stats.abbr= "'+ req.body.el2 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Forge Disc" AND beywatch.abstract_stats.abbr= "'+ req.body.fd2 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Performance Tip" AND beywatch.abstract_stats.abbr= "'+ req.body.pt2 +'";', [1,6],function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
  console.log(req.body)
});

router.post("/part/", function(req, res, next){
  var q = req.body.query
  var pt = req.body.part_type
  try{
    if(q.includes("'") || q.includes(".") || q.includes("\"") || q.includes("FROM") || q.includes("DELETE")){
      res.redirect("/")
    }
    if(pt.includes("'") || pt.includes(".") || pt.includes("\"") || pt.includes("FROM") || pt.includes("DELETE")){
      res.redirect("/")
    }

  }catch(e){
    console.log(e)
  }
  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="'+pt+'" AND beywatch.abstract_stats.name_hasbro LIKE "%' + q + '%" ORDER BY beywatch.abstract_stats.abbr', function(error, results, fields){
    if (error) throw error;
    res.send(results)
  });
});

router.get("/part/:part_type/:query", function(req, res, next){
  var q = req.params.query
  var pt = req.params.part_type
  if(q.includes("'") || q.includes(".") || q.includes("\"") || q.includes("FROM") || q.includes("DELETE")){
    res.redirect("/")
  }
  if(pt.includes("'") || pt.includes(".") || pt.includes("\"") || pt.includes("FROM") || pt.includes("DELETE")){
    res.redirect("/")
  }
  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="'+pt+'" AND beywatch.abstract_stats.name_hasbro LIKE "%' + q + '%" ORDER BY beywatch.abstract_stats.abbr', function(error, results, fields){
    if (error) throw error;
    res.send(results)
  });
});


module.exports = router;
