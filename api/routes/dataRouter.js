var express = require("express");
var router  = express.Router();
var mysql = require('mysql');
var sql_config = require('./sql_config.json')

var con = mysql.createConnection(sql_config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get("/:type", function(req, res, next){
  switch(req.params.type){
    case "energy":
      con.query('SELECT beywatch.abstract_stats.img_url FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Energy Layer" ', function (error, results, fields) {
        if (error) throw error;
        res.send(results[3]);
      });
      break;
    case "disc":
      res.send("Forge Discs Here");
      break;
    case "tip":
      res.send("Performance Tips go here");
      break;
    default:
      next();
  }
});
module.exports = router;
