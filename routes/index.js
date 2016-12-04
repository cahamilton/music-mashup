const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'MusicMashup - Your tasteful resource for music knowledge!',
  });
});

module.exports = router;
