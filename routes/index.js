const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'MusicMashup - Your tasteful resource for music knowledge!',
    asset: {
      basePath: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/',
    },
  });
});

module.exports = router;
