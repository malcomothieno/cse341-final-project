const express = require('express');
const router = express.Router();
const booksRouter = require('./books');
const authorsRouter = require('./authors');

router.get('/', (req, res) => {
  res.send('Library API — visit /api-docs for Swagger documentation.');
});

router.use('/books', booksRouter);
router.use('/authors', authorsRouter);

module.exports = router;
