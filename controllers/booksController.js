const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../models/booksModel');

// 8 fields — satisfies the 7+ field requirement
const REQUIRED_FIELDS = ['title', 'authorName', 'genre', 'publishedYear', 'isbn', 'pageCount', 'language', 'synopsis'];

function validate(body, requireAll) {
  const errors = [];

  if (requireAll) {
    for (const field of REQUIRED_FIELDS) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  if (body.publishedYear !== undefined) {
    const y = Number(body.publishedYear);
    if (isNaN(y) || y < 1000 || y > new Date().getFullYear() + 2) {
      errors.push('publishedYear must be a valid year (1000 to present+2)');
    }
  }

  if (body.pageCount !== undefined) {
    const p = Number(body.pageCount);
    if (isNaN(p) || p <= 0) {
      errors.push('pageCount must be a positive number');
    }
  }

  if (body.isbn !== undefined) {
    const isbn = String(body.isbn).replace(/[-\s]/g, '');
    if (isbn.length !== 10 && isbn.length !== 13) {
      errors.push('isbn must be a valid 10 or 13 digit ISBN');
    }
  }

  return errors;
}

// GET /books
async function getAll(req, res) {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    console.error('getAll books:', err);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
}

// GET /books/:id
async function getOne(req, res) {
  try {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    console.error('getOne book:', err);
    res.status(400).json({ error: 'Invalid ID or book not found' });
  }
}

// POST /books
async function create(req, res) {
  try {
    const errors = validate(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    const { title, authorName, genre, publishedYear, isbn, pageCount, language, synopsis } = req.body;
    const result = await createBook({
      title,
      authorName,
      genre,
      publishedYear: Number(publishedYear),
      isbn: String(isbn),
      pageCount: Number(pageCount),
      language,
      synopsis,
    });
    res.status(201).json({ message: 'Book created successfully', id: result.insertedId });
  } catch (err) {
    console.error('create book:', err);
    res.status(500).json({ error: 'Failed to create book' });
  }
}

// PUT /books/:id
async function update(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    const errors = validate(req.body, false);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    const result = await updateBook(req.params.id, req.body);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error('update book:', err);
    res.status(400).json({ error: 'Failed to update book' });
  }
}

// DELETE /books/:id
async function remove(req, res) {
  try {
    const result = await deleteBook(req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('delete book:', err);
    res.status(400).json({ error: 'Failed to delete book' });
  }
}

module.exports = { getAll, getOne, create, update, remove };
