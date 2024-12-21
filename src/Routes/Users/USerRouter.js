import express from 'express';
import { createNewUser, deleteUser, getUser } from '../../Controllers/Users/UserController.js';
import { isLoggedIn } from '../../Validators/AuthValidation.js';

// create the User Router 
const UserRouter = express.Router();

UserRouter.post('/create',createNewUser);
UserRouter.delete('/delete',isLoggedIn,deleteUser);
UserRouter.get('/',getUser);


export default UserRouter;

