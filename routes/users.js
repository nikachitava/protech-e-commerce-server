import express from 'express'
import { getUsers, updateUser, updatePersonalInfo, getPersonalInfo, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get("/", getUsers);
router.post("/update", updateUser);
router.post("/updatepersonalinfo", updatePersonalInfo)
router.get("/getpersonalinfo", getPersonalInfo)
router.delete("/deleteuser/:userID", deleteUser)


export default router;

