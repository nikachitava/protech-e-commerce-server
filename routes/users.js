import express from 'express'
import { getUsers, updateUser, updatePersonalInfo } from '../controllers/users.js';

const router = express.Router();

router.get("/", getUsers);
router.post("/update", updateUser);
router.post("/updatepersonalinfo", updatePersonalInfo)


export default router;

