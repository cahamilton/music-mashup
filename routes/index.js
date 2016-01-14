var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MusicMashup - Your tasteful resource for music knowledge!'
  });
});

module.exports = router;
