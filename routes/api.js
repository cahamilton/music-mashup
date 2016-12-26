const express = require('express');
const search = require('./api/search');

const router = express.Router();

router.get('/search/', (req, res, next) => {
  res.status(404).json({ error: 'Missing artistName parameter' });
});

router.get('/search/:artistName', (req, res, next) => {
  search.artist(req.params.artistName)
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error));
});

router.use((req, res, next) => {
  res.status(404).json({ error: 'Invalid API Method called' });
});

module.exports = router;
