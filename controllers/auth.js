import { connection } from '../connection.js';
import bcrypt from "bcryptjs";

export const register = (req, res) => {
    
    const { username, surname, email, password } = req.body;


    const query = "SELECT * FROM users WHERE email = ?";

    connection.query(query, [email], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.legth) return res.status(409).json({message: "This email already in use"})

        /* Hash password */
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const query = "INSERT INTO users (`username`, `surname`, `email`, `password`, `roleID`, `balance`) VALUES (?,?,?,?,?,?)";
        connection.query(query, [username, surname, email, hashedPassword, 3, 0], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({message: "User has been created."}) 
        })
    })
}