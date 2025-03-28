"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const dbUserRepository_1 = require("../infraestructure/dbUserRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Para generar un JWT
class UserController {
    constructor() {
        this.userService = new dbUserRepository_1.UserService(); // Instancia del servicio
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            // Verificamos que los campos estén presentes
            if (!username || !password) {
                res.status(406).json({ message: "Campos requeridos" });
                return;
            }
            try {
                // Buscamos el usuario por su username
                const user = yield this.userService.getUserByUsername(username);
                // Verificamos si el método devolvió un usuario válido
                if (user === undefined || user === null) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                // Comparamos la contraseña ingresada con la guardada en la base de datos
                const isPasswordValid = yield this.userService.checkPassword(user.password, password);
                // Si la contraseña es incorrecta
                if (!isPasswordValid) {
                    res.status(401).json({ message: "Contraseña incorrecta" });
                    return;
                }
                // Si la autenticación es exitosa, generamos un JWT
                const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, 'your_jwt_secret', // Cambia esto por tu clave secreta real
                { expiresIn: '1h' } // La duración del token
                );
                // Respondemos con el token
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            // Verificamos que los campos estén presentes
            if (!username || !password) {
                res.status(406).json({ message: "Campos requeridos" });
                return;
            }
            try {
                // Llamamos al servicio para registrar al nuevo usuario
                const newUser = yield this.userService.registerUser(username, password);
                // Si el registro es exitoso, devolvemos el nuevo usuario (o el id, dependiendo de lo que desees)
                res.status(201).json({
                    message: "Usuario registrado exitosamente",
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                    },
                });
            }
            catch (error) {
                if (error.message === 'El nombre de usuario ya está en uso') {
                    res.status(400).json({ message: "El nombre de usuario ya está en uso" });
                    return;
                }
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
