// db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Specify the path to the database file (for a persistent database)
const dbPath = path.resolve(__dirname, 'database.db');
console.log(`--------------------${dbPath}---------------`);
// Connect to the SQLite database or create it if it doesn’t exist
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Run migrations (create tables) if needed
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating users table:", err.message);
        } else {
            console.log("Users table is ready.");
        }
    });
});

module.exports = db;
