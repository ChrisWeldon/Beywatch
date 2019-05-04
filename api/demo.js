var mysql = require('mysql');

var con = mysql.createConnection({
  host: "157.230.91.232",
  user: "chris",
  password: "Chris)98",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('SELECT * FROM beywatch.abstract_stats', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});
