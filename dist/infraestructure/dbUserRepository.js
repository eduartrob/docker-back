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
exports.UserService = void 0;
const userModelMongo_1 = require("../infraestructure/userModelMongo"); // Importa el modelo
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Si usas bcrypt para encriptar la contraseña
class UserService {
    // Método para obtener un usuario por su username
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModelMongo_1.UserModel.findOne({ username }).exec();
                return user; // Esto devolverá un documento de Mongoose que tiene un campo `password`
            }
            catch (error) {
                throw new Error('Error al obtener el usuario');
            }
        });
    }
    checkPassword(storedPassword, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(password, storedPassword); // Comparando la contraseña encriptada
        });
    }
    // Método para encriptar la contraseña antes de guardarla
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10); // Genera un "sal" de 10 rondas
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt); // Encripta la contraseña
            return hashedPassword;
        });
    }
    // Método para agregar un nuevo usuario
    registerUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificamos si el usuario ya existe
            const existingUser = yield this.getUserByUsername(username);
            if (existingUser) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            // Encriptamos la contraseña antes de guardarla
            const hashedPassword = yield this.hashPassword(password);
            // Creamos el nuevo usuario y lo guardamos en la base de datos
            const newUser = new userModelMongo_1.UserModel({
                username,
                password: hashedPassword,
            });
            // Guardamos el nuevo usuario en la base de datos
            yield newUser.save();
            return newUser; // Devolvemos el nuevo usuario, o puedes devolver solo el id
        });
    }
}
exports.UserService = UserService;
