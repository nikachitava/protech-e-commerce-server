import { connection } from '../connection.js';

export const getUsers = (req, res) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json(data);
    });
}

export const updateUser = (req, res) => {
    const query = "UPDATE users SET username = ?, surname = ?, email = ? WHERE userID = ?";
    connection.query(query, [req.body.username, req.body.surname, req.body.email, req.body.userID], (err, data) => {
        if(err) return res.status(500).json(err);
        console.log('User data updated successfully');
        return res.json({ message: 'User data updated successfully' });
    });
}