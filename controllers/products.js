import { connection } from '../connection.js';

export const getProducts = (req, res) => {
    const query = "SELECT *, CONCAT(users.username, ' ', users.surname) AS author FROM products JOIN users ON products.userID = users.userID;"
    connection.query(query, (err, data)=> {
        if(err) return res.status(500).json(err);
        return res.json(data)
    });
}

export const getProduct = (req, res) => {
    const productID = req.params.productID;
    const query = "SELECT * FROM products WHERE productID = ?";
    connection.query(query, [productID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}

