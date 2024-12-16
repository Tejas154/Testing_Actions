const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, 'data/mydatabase.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

function registerUser(email, password, callback) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;

    db.run(sql, [email, hashedPassword], function(err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { message: 'User registered successfully', userId: this.lastID });
        }
    });
}

function loginUser(email, password, callback) {
    const sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, [email], (err, user) => {
        if (err) {
            return callback(err, null);
        }

        if (!user) {
            return callback(null, { message: 'User not found', success: false });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            callback(null, { message: 'Login successful', success: true, userId: user.id });
        } else {
            callback(null, { message: 'Invalid password', success: false });
        }
    });
}

module.exports = { registerUser, loginUser };
