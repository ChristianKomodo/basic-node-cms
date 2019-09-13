const express = require('express');
const router = express.Router();

const fs = require('fs');

/* GET edit page view */
router.get('/', function (req, res, next) {
  res.render('edit');
});

/* POST to update the content JSON file */
router.post('/', function (req, res) {
  console.log('req.body from the form is', req.body);
  const newPageContent = {
    'heading': req.body.heading,
    'content': req.body.content
  }
  // Read contents from site-data.json and send with page to be rendered
  fs.writeFile("site-data.json", JSON.stringify(newPageContent), (err, data) => {
    if (err) console.log(err);
    res.redirect('/');
  });
});

module.exports = router;