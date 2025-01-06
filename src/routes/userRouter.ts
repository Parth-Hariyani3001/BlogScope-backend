import express from "express";
import signupUser from "../controller/user/signupUser";
import signinUser from "../controller/user/signinUser";
import getUser from "../controller/user/getUser";
import getUsers from "../controller/user/getUsers";
import updateUser from "../controller/user/updateUser";
import deleteUser from "../controller/user/deleteUser";
import resetPasswordToken from "../controller/user/resetPasswordToken";
import resetPassword from "../controller/user/resetPassword";
import validateToken from "../controller/auth/authController"

const router = express.Router();

router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.post('/reset-password-token', resetPasswordToken)
router.get('/:id', getUser)
router.get('/', getUsers)
router.put('/update', validateToken, updateUser)
router.patch('/reset-password', resetPassword)
router.delete('/delete', validateToken, deleteUser)

export default router;
