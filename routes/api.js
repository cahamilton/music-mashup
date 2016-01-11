var express = require('express');
var router = express.Router();

var search = require('./api/search');

router.get('/search/', function(req, res, next) {
  res.status(404).send({
    error: 'Missing artistName parameter'
  });
});

router.get('/search/:artistName', function(req, res, next) {
  var artistName = req.params.artistName;
  search.artist(artistName, function(data) {
    res.json(data);
  });
});

router.use(function(req, res, next) {
  res.status(404).send({
    error: 'Invalid API Method called'
  });
});

module.exports = router;
