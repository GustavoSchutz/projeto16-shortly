import express from 'express';
import { userSignup } from '../controllers/auth.controller.js';
//import 

const authRouter = express.Router();
authRouter.post('/signup', userSignup);

export { authRouter };