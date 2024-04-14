const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json("from backend side");
});

app.get('/users', (req, res) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get('/categories', (req, res) => {
    const query = "SELECT * FROM categories";
    connection.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/products', (req, res) => {
    const query = "SELECT *, CONCAT(users.username, ' ', users.surname) AS author FROM products JOIN users ON products.userID = users.userID;"
    connection.query(query, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post('/register', (req, res) => {
    const { username, surname, email, password } = req.body;

    connection.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (rows.length > 0) {
                res.status(400).json({ message: 'User already exists' });
            } else {
                connection.query("INSERT INTO users (`username`, `surname`, `email`, `password`, `roleID`, `balance`) VALUES (?,?,?,?,?,?)", [username, surname, email, password, 3, 0], (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ message: 'Internal server error' });
                    } else {
                        res.status(200).json({ message: 'User registered successfully' });
                    }
                });
            }
        }
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'protech_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});
