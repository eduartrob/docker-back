import { Router } from "express";

import { UserController } from "../infraestructure/authentication";
const userController = new UserController();

const userRouter = Router();

userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.post('/register', (req, res) => userController.register(req, res));


export default userRouter;