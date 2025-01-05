import express from "express";
import signupUser from "../controller/user/signupUser";
import signinUser from "../controller/user/signinUser";
import getUser from "../controller/user/getUser";
import getUsers from "../controller/user/getUsers";
import updateUser from "../controller/user/updateUser";
import validateToken from "../controller/auth/authController"

const router = express.Router();

router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.get('/:id', getUser)
router.get('/', getUsers)
router.put('/update', validateToken, updateUser)

export default router;
