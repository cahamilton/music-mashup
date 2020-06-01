/** @format */

const express = require('express');

const router = express.Router();
const isProduction = require('../helpers/isProduction');
const manifest = require('../rev-manifest.json');

/**
 * @param filename
 * @return {string}
 */
const getAssetPath = (filename) => {
  const basePath = isProduction ? '/' : 'http://localhost:8080/';

  if (!manifest[filename]) {
    return `${basePath}${filename}`;
  }

  return `${basePath}${manifest[filename]}`;
};

router.get('/', (req, res) => {
  res.render('index', {
    title: 'MusicMashup - Your tasteful resource for music knowledge!',
    getAssetPath,
  });
});

module.exports = router;
