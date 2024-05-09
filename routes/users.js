import express from 'express'
import { getUsers, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get("/", getUsers);
router.post("/update", updateUser);


export default router;

