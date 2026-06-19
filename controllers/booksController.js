const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../models/authorsModel');

const REQUIRED_FIELDS = ['firstName', 'lastName', 'nationality', 'birthYear', 'knownFor'];

function validate(body, requireAll) {
  const errors = [];

  if (requireAll) {
    for (const field of REQUIRED_FIELDS) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  if (body.birthYear !== undefined) {
    const y = Number(body.birthYear);
    if (isNaN(y) || y < 1800 || y > new Date().getFullYear()) {
      errors.push('birthYear must be a valid year between 1800 and present');
    }
  }

  if (body.firstName !== undefined && typeof body.firstName !== 'string') {
    errors.push('firstName must be a string');
  }

  if (body.lastName !== undefined && typeof body.lastName !== 'string') {
    errors.push('lastName must be a string');
  }

  return errors;
}

// GET /authors
async function getAll(req, res) {
  try {
    const authors = await getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    console.error('getAll authors:', err);
    res.status(500).json({ error: 'Failed to retrieve authors' });
  }
}

// GET /authors/:id
async function getOne(req, res) {
  try {
    const author = await getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    console.error('getOne author:', err);
    res.status(400).json({ error: 'Invalid ID or author not found' });
  }
}

// POST /authors
async function create(req, res) {
  try {
    const errors = validate(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    const { firstName, lastName, nationality, birthYear, knownFor } = req.body;
    const result = await createAuthor({
      firstName,
      lastName,
      nationality,
      birthYear: Number(birthYear),
      knownFor,
    });
    res.status(201).json({ message: 'Author created successfully', id: result.insertedId });
  } catch (err) {
    console.error('create author:', err);
    res.status(500).json({ error: 'Failed to create author' });
  }
}

// PUT /authors/:id
async function update(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    const errors = validate(req.body, false);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    const result = await updateAuthor(req.params.id, req.body);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json({ message: 'Author updated successfully' });
  } catch (err) {
    console.error('update author:', err);
    res.status(400).json({ error: 'Failed to update author' });
  }
}

// DELETE /authors/:id
async function remove(req, res) {
  try {
    const result = await deleteAuthor(req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (err) {
    console.error('delete author:', err);
    res.status(400).json({ error: 'Failed to delete author' });
  }
}

module.exports = { getAll, getOne, create, update, remove };
