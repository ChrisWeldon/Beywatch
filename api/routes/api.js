var express = require("express");
var router  = express.Router();
var mysql = require('mysql');
var sql_config = require('../sql_config.json')

var con = mysql.createConnection(sql_config);

function  nat(val){
  if(val<0){
    return(0)
  }else{
    return(val)
  }
}

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

router.post("/", function(req, res, next){
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
  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="'+pt+'" AND beywatch.abstract_stats.name_hasbro LIKE "' + q + '%" ORDER BY beywatch.abstract_stats.abbr', function(error, results, fields){
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

router.all("/part/all/", function(req, res, next){
  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Energy Layer";' +
  'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Forge Disc";' +
  'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_type="Performance Tip";', [1,3], function(error, results, fields){
    if (error) throw error;
    res.send(results)
  })
});

router.post("/match/", function(req, res, next){

  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ req.body.el1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ req.body.fd1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ req.body.pt1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ req.body.el2 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ req.body.fd2 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ req.body.pt2 +'";', [1,6],function (error, results, fields) {
    if (error) throw error;
    MatchPredictor.predict(results, (output)=>{
      res.send(output)
    });
  });

});

router.get("/match/", function(req, res, next){
  con.query('SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ 6 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ 1 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ 2 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ 3 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ 4 +'";' +
            'SELECT * FROM beywatch.abstract_stats WHERE beywatch.abstract_stats.part_id= "'+ 5 +'";', [1,6],function (error, results, fields) {
    if (error) throw error;
    MatchPredictor.predict(results, (output)=>{
      res.send(output)
    })
  });

});

class MatchPredictor{
  constructor(){

  }
  //basic mathematical predictor
  static simpleAddition({el1, fd1, pt1, el2, fd2, pt2}){
    let bey1 = nat(el1.attack) + nat(fd1.attack) + nat(pt1.attack) +
                      nat(el1.defense) + nat(fd1.defense) + nat(pt1.defense) +
                      nat(el1.stamina) + nat(fd1.stamina) + nat(pt1.stamina) +
                      nat(el1.weight_stat) + nat(fd1.weight_stat) + nat(pt1.weight_stat) +
                      nat(el1.speed) + nat(fd1.speed) + nat(pt1.speed) +
                      nat(el1.burst) + nat(fd1.burst) + nat(pt1.burst);

    let bey2 = nat(el2.attack) + nat(fd2.attack) + nat(pt2.attack) +
                      nat(el2.defense) + nat(fd2.defense) + nat(pt2.defense) +
                      nat(el2.stamina) + nat(fd2.stamina) + nat(pt2.stamina) +
                      nat(el2.weight_stat) + nat(fd2.weight_stat) + nat(pt2.weight_stat) +
                      nat(el2.speed) + nat(fd2.speed) + nat(pt2.speed) +
                      nat(el2.burst) + nat(fd2.burst) + nat(pt2.burst);
    return({
      pred: [bey1, bey2],
      prob: [(bey1-bey2)/(bey1), (bey2-bey1)/(bey2) ]
    })
  }

  static predict(data, callback){
    //Prediction goes here
    let pred = this.simpleAddition({
        el1: data[0][0],
        fd1: data[1][0],
        pt1: data[2][0],
        el2: data[3][0],
        fd2: data[4][0],
        pt2: data[5][0]
      })
    callback(pred);
  }
}


module.exports = router;
