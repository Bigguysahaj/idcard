const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const connection = require('../db');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/form/new', (req, res) => {
  res.send(`
  <form action="/form" method="post">

    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br><br>

    <label for="rollnum">Roll No:</label>
    <input type="BIGINT" id="rollnum" name="rollnum"><br><br>
    
    <label for="course">Course:</label>
    <input type="text" id="course" name="course"><br><br>

    <label for="fathername">Father's Name:</label>
    <input type="text" id="fathername" name="fathername"><br><br>
    
    <label for="phone">Phone no:</label>
    <input type="BIGINT" id="phone" name="phone"><br><br>
    
    <label for="email">Email:</label>
    <input type="text" id="email" name="email"><br><br>
    
    <label for="address">Address:</label>
    <input type="text" id="address" name="address"><br><br>
    
    <label for="session">Session:</label>
    <input type="text" id="session" name="session"><br><br>
    
    <input type="submit" value="Submit">
    
  </form>`
  );
});


router.post('/form', (req, res) =>{
  const {rollnum, name, course, phone, session, address, fathername, email} = req.body;

  console.log(req.body);
  connection.query(
    'INSERT INTO Users (rollnum, name, course, phone, session, address, fathername, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [rollnum, name, course, phone, session, address, fathername, email],
    (err, results) => {
      if (err) {
        return res.send(err);
      }
      return res.send('successfully added user');
    }
  );
});

module.exports = router;