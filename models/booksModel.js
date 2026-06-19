const { getDatabase } = require('../db/connect');
const { ObjectId } = require('mongodb');

const COLLECTION = 'books';

async function getAllBooks() {
  const db = getDatabase();
  return db.collection(COLLECTION).find({}).toArray();
}

async function getBookById(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function createBook(data) {
  const db = getDatabase();
  return db.collection(COLLECTION).insertOne(data);
}

async function updateBook(id, fields) {
  const db = getDatabase();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: fields }
  );
}

async function deleteBook(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
