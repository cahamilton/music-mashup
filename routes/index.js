/** @format */

const express = require('express');
const getAssetPath = require('../utilities/getAssetPath');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'MusicMashup - Your tasteful resource for music knowledge!',
    getAssetPath,
  });
});

module.exports = router;
