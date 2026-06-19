# Library API — CSE 341 W05 Final Project

RESTful API for managing a library database with full CRUD operations, data validation, error handling, and Swagger documentation.

## Tech Stack
- Node.js + Express
- MongoDB Atlas (`libraryDB` database)
- swagger-ui-express + swagger-autogen
- cors + dotenv

## Project Structure (MVC)
```
w05-project/
├── server.js                      # Entry point
├── db/
│   └── connect.js                 # MongoDB connection
├── models/
│   ├── booksModel.js              # Queries → 'books' collection
│   └── authorsModel.js            # Queries → 'authors' collection
├── controllers/
│   ├── booksController.js         # CRUD logic + validation (8 fields)
│   └── authorsController.js       # CRUD logic + validation
├── routes/
│   ├── index.js                   # Root router
│   ├── books.js                   # /books — full CRUD
│   ├── authors.js                 # /authors — full CRUD
│   └── swagger.js                 # /api-docs
├── data/
│   └── seed.js                    # Seeds 6 books + 4 authors
├── swagger.json                   # Swagger 2.0 API documentation
├── swagger.js                     # swagger-autogen script
├── project.rest                   # REST client test file
├── .env.example                   # Env var template
└── .gitignore                     # Excludes .env + node_modules
```

## Collections

### books (8 fields — satisfies 7+ field requirement)
| Field | Type | Validation |
|-------|------|------------|
| title | string | required |
| authorName | string | required |
| genre | string | required |
| publishedYear | integer | required, 1000–present+2 |
| isbn | string | required, 10 or 13 digits |
| pageCount | integer | required, > 0 |
| language | string | required |
| synopsis | string | required |

### authors (5 fields)
| Field | Type | Validation |
|-------|------|------------|
| firstName | string | required |
| lastName | string | required |
| nationality | string | required |
| birthYear | integer | required, 1800–present |
| knownFor | string | required |

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /books | Get all books |
| GET | /books/:id | Get book by ID |
| POST | /books | Create book (all 8 fields required) |
| PUT | /books/:id | Update book |
| DELETE | /books/:id | Delete book |
| GET | /authors | Get all authors |
| GET | /authors/:id | Get author by ID |
| POST | /authors | Create author |
| PUT | /authors/:id | Update author |
| DELETE | /authors/:id | Delete author |

## Setup
1. `npm install`
2. Copy `.env.example` → `.env` and fill in your MongoDB URI
3. `node data/seed.js` to populate both collections
4. `npm start`
5. Visit `http://localhost:3000/api-docs`

## Render Environment Variables
- `MONGODB_URI`
- `DB_NAME=libraryDB`
