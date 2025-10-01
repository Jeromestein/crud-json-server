const mongoose = require('mongoose');
const Book = require('./models/Book');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booklist';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample book data from db.json
const books = [
  {
    title: "Lord of The Rings",
    author: "J.R.R. Tolkien"
  },
  {
    title: "The Alchemist",
    author: "Paul Coelho"
  },
  {
    title: "Da Vinci Code",
    author: "Dan Brown"
  },
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens"
  }
];

// Clear existing books and insert new ones
async function seedDatabase() {
  try {
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');
    
    // Insert new books
    const insertedBooks = await Book.insertMany(books);
    console.log(`Inserted ${insertedBooks.length} books`);
    
    // Close connection
    mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
}

seedDatabase();
