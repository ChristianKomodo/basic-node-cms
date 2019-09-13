const express = require('express');
const router = express.Router();

const fs = require('fs');

/* GET index page view */
router.get('/', function (req, res) {
  fs.readFile('site-data.json', (err, data) => {
    if (err) throw err;
    const pageData = JSON.parse(data);
    res.render('index', {pageData: pageData});
  });
});

module.exports = router;