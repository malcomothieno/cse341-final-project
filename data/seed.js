require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');

const authors = [
  { firstName: 'Chinua', lastName: 'Achebe', nationality: 'Nigerian', birthYear: 1930, knownFor: 'Things Fall Apart, Arrow of God, No Longer at Ease' },
  { firstName: 'Ngũgĩ', lastName: 'wa Thiong\'o', nationality: 'Kenyan', birthYear: 1938, knownFor: 'Weep Not Child, A Grain of Wheat, Petals of Blood' },
  { firstName: 'Chimamanda', lastName: 'Ngozi Adichie', nationality: 'Nigerian', birthYear: 1977, knownFor: 'Purple Hibiscus, Half of a Yellow Sun, Americanah' },
  { firstName: 'George', lastName: 'Orwell', nationality: 'British', birthYear: 1903, knownFor: '1984, Animal Farm, Homage to Catalonia' },
];

// 8 fields each — satisfies 7+ field requirement
const books = [
  { title: 'Things Fall Apart', authorName: 'Chinua Achebe', genre: 'Literary Fiction', publishedYear: 1958, isbn: '9780385474542', pageCount: 209, language: 'English', synopsis: 'The story of Okonkwo, a proud Igbo warrior whose world is disrupted by the arrival of European colonizers in Nigeria.' },
  { title: 'Weep Not Child', authorName: 'Ngũgĩ wa Thiong\'o', genre: 'Literary Fiction', publishedYear: 1964, isbn: '9780143106692', pageCount: 169, language: 'English', synopsis: 'The first novel in English by an East African, telling the story of Njoroge and the impact of the Mau Mau uprising on his family.' },
  { title: 'Half of a Yellow Sun', authorName: 'Chimamanda Ngozi Adichie', genre: 'Historical Fiction', publishedYear: 2006, isbn: '9781400044207', pageCount: 433, language: 'English', synopsis: 'Set during the Biafran War, the novel follows three characters whose lives intertwine during the Nigerian Civil War.' },
  { title: 'Americanah', authorName: 'Chimamanda Ngozi Adichie', genre: 'Contemporary Fiction', publishedYear: 2013, isbn: '9780307455925', pageCount: 477, language: 'English', synopsis: 'A young Nigerian woman navigates race and identity after emigrating to the United States.' },
  { title: '1984', authorName: 'George Orwell', genre: 'Dystopian Fiction', publishedYear: 1949, isbn: '9780451524935', pageCount: 328, language: 'English', synopsis: 'In a totalitarian future society, Winston Smith works for the government rewriting history but begins to question the regime.' },
  { title: 'A Grain of Wheat', authorName: 'Ngũgĩ wa Thiong\'o', genre: 'Historical Fiction', publishedYear: 1967, isbn: '9780143106983', pageCount: 247, language: 'English', synopsis: 'Set around Kenya\'s independence, the novel weaves together the stories of villagers preparing to celebrate Uhuru.' },
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || 'libraryDB');

    await db.collection('authors').deleteMany({});
    await db.collection('books').deleteMany({});

    const authResult = await db.collection('authors').insertMany(authors);
    console.log(`Inserted ${authResult.insertedCount} authors`);

    const bookResult = await db.collection('books').insertMany(books);
    console.log(`Inserted ${bookResult.insertedCount} books`);

    console.log('\n--- Sample IDs ---');
    console.log('Author IDs:', Object.values(authResult.insertedIds).map(id => id.toString()));
    console.log('Book IDs:', Object.values(bookResult.insertedIds).map(id => id.toString()));
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
