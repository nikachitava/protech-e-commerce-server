import { connection } from '../connection.js';
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    
    const { username, surname, email, password } = req.body;


    const query = "SELECT * FROM users WHERE email = ?";

    connection.query(query, [email], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json({message: "This email already in use"})

        const query = "INSERT INTO users (`username`, `surname`, `email`, `password`, `roleID`, `balance`) VALUES (?,?,?,?,?,?)";
        connection.query(query, [username, surname, email, password, 3, 0], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({message: "User has been created."}) 
        })
    })
}

export const login = (req, res) => {
    const query = "SELECT * FROM users WHERE email = ?";

    connection.query(query, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json({message: "User not found"});

        
        if(req.body.password !== data[0].password) {
            return res.status(400).json({message: "Wrong email or password"});
        }
        
        const token = jwt.sign({id: data[0].id}, "secretkey")

        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has beed logged out")
}