import { connection } from '../connection.js';

export const registration = (req, res) => {
    
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
}