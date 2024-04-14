import { connection } from '../connection.js';

export const getCategories = (req, res) => {
    const query = "SELECT * FROM categories";
    connection.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}