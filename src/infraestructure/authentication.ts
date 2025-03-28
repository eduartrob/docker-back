import { Request, Response } from "express";
import { UserService } from '../infraestructure/dbUserRepository';
import bcrypt from 'bcryptjs'; // Si usas bcrypt para contraseñas
import jwt from 'jsonwebtoken'; // Para generar un JWT

export class UserController{
    private userService: UserService;

    constructor() {
        this.userService = new UserService(); // Instancia del servicio
    }

    async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
    
        // Verificamos que los campos estén presentes
        if (!username || !password) {
          res.status(406).json({ message: "Campos requeridos" });
          return;
        }
    
        try {
          // Buscamos el usuario por su username
          const user = await this.userService.getUserByUsername(username);
          
          // Verificamos si el método devolvió un usuario válido
          if (user === undefined || user === null) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
          }
    
          // Comparamos la contraseña ingresada con la guardada en la base de datos
          const isPasswordValid = await this.userService.checkPassword(user.password, password);
    
          // Si la contraseña es incorrecta
          if (!isPasswordValid) {
            res.status(401).json({ message: "Contraseña incorrecta" });
            return;
          }
    
          // Si la autenticación es exitosa, generamos un JWT
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            'your_jwt_secret', // Cambia esto por tu clave secreta real
            { expiresIn: '1h' } // La duración del token
          );
    
          // Respondemos con el token
          res.status(200).json({ token });
        } catch (error: any) {
          res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    // Verificamos que los campos estén presentes
    if (!username || !password) {
      res.status(406).json({ message: "Campos requeridos" });
      return;
    }

    try {
      // Llamamos al servicio para registrar al nuevo usuario
      const newUser = await this.userService.registerUser(username, password);

      // Si el registro es exitoso, devolvemos el nuevo usuario (o el id, dependiendo de lo que desees)
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
          id: newUser._id,
          username: newUser.username,
        },
      });
    } catch (error: any) {
      if (error.message === 'El nombre de usuario ya está en uso') {
        res.status(400).json({ message: "El nombre de usuario ya está en uso" });
        return;
      }
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}