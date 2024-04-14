import express from 'express';
import cors from 'cors'
import { connection } from './connection.js';
import productsRoutes from './routes/products.js'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/categories', (req, res) => {
    const query = "SELECT * FROM categories";
    connection.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
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


app.use("/products", productsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});
