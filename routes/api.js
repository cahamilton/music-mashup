const express = require('express');
const router = express.Router();

const search = require('./api/search');

router.get('/search/', (req, res, next) => {
  res.status(404).send({
    error: 'Missing artistName parameter',
  });
});

router.get('/search/:artistName', (req, res, next) => {
  const artistName = req.params.artistName;
  search.artist(artistName, (data) => {
    res.json(data);
  });
});

router.use((req, res, next) => {
  res.status(404).send({
    error: 'Invalid API Method called',
  });
});

module.exports = router;
