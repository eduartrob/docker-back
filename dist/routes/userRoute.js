"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../infraestructure/authentication");
const userController = new authentication_1.UserController();
const userRouter = (0, express_1.Router)();
userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.post('/register', (req, res) => userController.register(req, res));
exports.default = userRouter;
