const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
app.use(express.json());
const db = mysql.createPool({
  host: process.env.DB_HOST, //localhost
  user: process.env.DB_USER, //root
  password: process.env.DB_PASSWORD, //password
  database: process.env.DB, //DB
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port)
})
//get
app.get("/view", (req, res) => {
  db.query("SELECT * FROM data", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//post
app.post("/post", (req, res) => {
  const insertQuery = "INSERT INTO data SET ?";
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Data Added to Database");
    }
  });
});
//update
app.put("/update", (req, res) => {
  const updateQuery =
    "UPDATE data SET id=? WHERE name = ?";
  db.query(
    updateQuery,
    [req.body.id, req.body.name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//delete
app.delete("/delete/:active", (req, res) => {
  db.query(
    "DELETE FROM data WHERE active = ?",
    req.params.active,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});