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
        return res.json({ message: 'User data updated successfully' });
    });
}

export const updatePersonalInfo = (req, res) => {
    const callProcedure = 'Call changePersonalInfo(?, ?, ?, ?, ?)';
    connection.query(callProcedure, [req.body.address, req.body.district, req.body.phoneNumber, req.body.addressTitle, req.body.userID], (err) => {
        if(err) return res.status(500).json(err);
        return res.json({ message: 'Stored procedure executed successfully' });
    })
}

export const getPersonalInfo = (req, res) => {
    const userID = req.query.userID;
    const query = "SELECT * from personalinfo WHERE fk_userID = ?";
    connection.query(query, [userID], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json(data);
    })
}

export const deleteUser = (req, res) => {
    const userID = req.params.userID;
    const query = "DELETE FROM users WHERE userID = ?";
    connection.query(query, [userID], (err) => {
        if (err) {
            console.error("Error deleting user:", err);
            res.status(500).send("Error deleting user");
            return;
          }
          console.log("User deleted successfully");
          res.status(200).send("User deleted successfully");
    })
}
