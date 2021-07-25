const express = require("express");
const mysql = require("mysql");

var cors = require("cors");

const app = express();

const db = mysql.createConnection({
  host: "203.159.93.64",
  user: "iot",
  password: "P@ssw0rd",
  database: "dust_db",
});

app.use(cors());
app.use(express.json());
try {  
  app.get("/data", (req, res) => {
    db.query("SELECT * FROM `log_tb`", function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  // INSERT INTO log_tb(log_device, log_pm1, log_pm25, log_pm10, log_temp) VALUES ()
  app.get("/insertdata/:log_device/:log_pm1/:log_pm25/:log_pm10/:log_temp", (req, res) => {
    const log_device = req.params.log_device;
    const log_pm1 = req.params.log_pm1;
    const log_pm25 = req.params.log_pm25;
    const log_pm10 = req.params.log_pm10;
    const log_temp = req.params.log_temp;
  const query = "INSERT INTO log_tb(log_device, log_pm1, log_pm25, log_pm10, log_temp) VALUES (\'" +log_device + "\',\'" +log_pm1 + "\',\'" +log_pm25 + "\',\'" +log_pm10 + "\',\'" +log_temp+"\')";
  console.log(query)
    db.query(query, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send("[]");
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

}
catch{

}


app.listen(3001, () => console.log("Server Started..."));
