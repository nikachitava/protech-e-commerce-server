import { connection } from '../connection.js';

export const getUsers = (req, res) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json(data);
    });
}