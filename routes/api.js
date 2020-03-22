/** @format */

const express = require('express');

const info = require('./api/info');
const search = require('./api/search');
const videos = require('./api/videos');

const router = express.Router();

router.get('/search/', search);
router.get('/search/:artistName', search);

router.get('/info/', info);
router.get('/info/:musicBrainzID', info);

router.get('/videos/', videos);
router.get('/videos/:musicBrainzID', videos);

router.use((req, res) => {
  res.status(404).json({ error: 'Invalid API Method called' });
});

module.exports = router;
