import express from 'express';
import { login } from '../../Controllers/Auth/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/login', login);

export default AuthRouter;