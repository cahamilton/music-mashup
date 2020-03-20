/** @format */

const express = require('express');
const search = require('./api/search');
const info = require('./api/info');
const videos = require('./api/videos');

const router = express.Router();

router.get('/search/', (req, res) => {
  res.status(404).json({ error: 'Missing artistName parameter' });
});

router.get('/search/:artistName', (req, res) => {
  search
    .artist(req.params.artistName)
    .then((results) => res.json(results))
    .catch((error) => res.status(500).json(error));
});

router.get('/info/', (req, res) => {
  res.status(404).json({ error: 'Missing musicBrainzID parameter' });
});

router.get('/info/:musicBrainzID', (req, res) => {
  info
    .mbid(req.params.musicBrainzID)
    .then((results) => res.json(results))
    .catch((error) => res.status(500).json(error));
});

router.get('/videos/', videos);
router.get('/videos/:musicBrainzID', videos);

router.use((req, res) => {
  res.status(404).json({ error: 'Invalid API Method called' });
});

module.exports = router;