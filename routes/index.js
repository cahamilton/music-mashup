/** @format */

const express = require('express');

const router = express.Router();
const isProduction = require('../helpers/isProduction');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'MusicMashup - Your tasteful resource for music knowledge!',
    asset: {
      basePath: isProduction ? '/' : 'http://localhost:8080/',
    },
  });
});

module.exports = router;
