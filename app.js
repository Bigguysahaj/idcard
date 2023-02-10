const express = require('express');
const PORT = 8080;
// const mysql = require('mysql2');
const puppeteer = require('puppeteer');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const app = express();

// this is for adding the directory of the file
const path = require('path');
const hbs = require('hbs');

const formRouter = require('./pages/form');

app.use(express.json());
app.use('/', formRouter);
const connection = require('./db');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use( express.static( "public" ) );
const pdf = require('pdf-creator-node');
const sync = require('sync-request');
const axios = require('axios');

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', __dirname);



app.get('/html', async(req, res) => {
  // let rollnum = req.query.rollnum;
  //  name, rollnum, course, session, phone, address, fathername
  // try {
  //   const users = connection.query('SELECT name, rollnum, course, session, phone, address, fathername FROM users')
  //   res.json(users.rows);
  // } catch (err) {
  //   console.error(err);
  // }
  // const imgP = ['1.png','2.png', '500qr.png'];
  // let imgs = [];

  // for(let i = 0; i<imgP.length; i++){
  //   let img = sync('GET', imgP[i]);
  //   imgs.push(img.getBody());
  // }

  const rollnum = 2104920100096;
  // let imgs = [];

  // for (const url of imgUrls) {
  //   try {
  //     const response = await fetch(url);
  //     const buffer = await response.arrayBuffer();
  //     const img = Buffer.from(new Uint8Array(buffer));
  //     imgs.push(img);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
//   for(let i = 0; i<imgP.length; i++){
//     let img = await axios.get(imgP[i], {responseType: 'arraybuffer'});
//     imgs.push(img.data);
//   }

// NOW BEFORE YOU TRY ANYTHING NEXT, TRY TO ADD ADDITION TIME IN THIS FUNCTION TO GIVE TIME FOR THE IMAGES TO LOAD
//   setTimeout(() => {
//     res.render('main', { imgs: imgs});
//   }, 1000);
  connection.query('SELECT * FROM users WHERE rollnum = ?', [rollnum]
  , function(err, results, fields) {
      if(err) {
          console.log(err);
      } else {
          // res.render('index', {res: res}, {imgs});
          console.log({results: results});
          
          res.render('main', {results: results});
      }
  });



});



(async () => {
    const browser = await puppeteer.launch();
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();

    await page1.goto('http://localhost:8080/html', { waitUntil: 'networkidle0' });
    

    await page1.pdf({
        path: path.join('./result', 'picture.pdf'),
        // format: 'A4',
        width: '399px',
        height: '681px',
        printBackground: true
    });

    await browser.close();
})();




app.use('/', router);

module.exports = app;

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT + '...', 'go to http://localhost:' + PORT + '/form/new');
});

