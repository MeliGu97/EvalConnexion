import express from 'express'
import {getFormInscription, getFormLogin, getSecurePage, login, logout, addUser} from "../controller/user.controller.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router()

router.get('/', getFormInscription)
router.get('/secure', authMiddleware, getSecurePage)
router.get('/login', getFormLogin)
router.get('/logout', authMiddleware, logout)

router.post('/login', login)
router.post('/addUser', addUser)


export default router