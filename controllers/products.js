import { connection } from '../connection.js';

export const getProducts = (req, res) => {
    const { category } = req.query; 
    let query = "SELECT *, CONCAT(users.username, ' ', users.surname) AS author FROM products JOIN users ON products.userID = users.userID JOIN categories ON products.categoryID = categories.categoryID";

    if (category) {
        query += ` WHERE categories.categoryName = '${category}'`; 
    }
    
    connection.query(query, (err, data)=> {
        if(err) return res.status(500).json(err);
        return res.json(data)
    });
}



export const getProduct = (req, res) => {
    const productID = req.params.productID;
    const query = `SELECT products.*, categories.*, brands.*, CONCAT(users.username, ' ', users.surname) AS author
    FROM products
    INNER JOIN categories ON products.categoryID = categories.categoryID
    INNER JOIN brands ON products.brandID = brands.brandID
    INNER JOIN users ON products.userID = users.userID
    WHERE products.productID = ?`
    connection.query(query, [productID], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}

export const deleteProduct = (req, res) => {
    const productID = req.params.productID;
    const query = "DELETE FROM products WHERE productID = ?";
    connection.query(query, [productID], (err) => {
        if (err) {
            console.error("Error deleting product:", err);
            res.status(500).send("Error deleting product");
            return;
          }
          console.log("product deleted successfully");
          res.status(200).send("product deleted successfully");
    })
}

