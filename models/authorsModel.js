const { getDatabase } = require('../db/connect');
const { ObjectId } = require('mongodb');

const COLLECTION = 'authors';

async function getAllAuthors() {
  const db = getDatabase();
  return db.collection(COLLECTION).find({}).toArray();
}

async function getAuthorById(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function createAuthor(data) {
  const db = getDatabase();
  return db.collection(COLLECTION).insertOne(data);
}

async function updateAuthor(id, fields) {
  const db = getDatabase();
  return db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: fields }
  );
}

async function deleteAuthor(id) {
  const db = getDatabase();
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
