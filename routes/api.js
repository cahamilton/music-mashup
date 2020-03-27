/** @format */

const express = require('express');

const biography = require('./api/biography');
const info = require('./api/info');
const search = require('./api/search');
const videos = require('./api/videos');

const router = express.Router();

router.post('/biography/', biography);
router.post('/biography/:musicBrainzID', biography);

router.get('/search/', search);
router.get('/search/:artistName', search);

router.get('/info/', info);
router.get('/info/:musicBrainzID', info);

router.post('/videos/', videos);
router.post('/videos/:musicBrainzID', videos);

router.use((req, res) => {
  res.status(404).json({ error: 'Invalid API Method called' });
});

module.exports = router;
