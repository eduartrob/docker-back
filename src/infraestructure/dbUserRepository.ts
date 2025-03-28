import { UserModel } from '../infraestructure/userModelMongo'; // Importa el modelo
import bcrypt from 'bcryptjs'; // Si usas bcrypt para encriptar la contraseña

export class UserService {
  // Método para obtener un usuario por su username
  async getUserByUsername(username: string) {
    try {
      const user = await UserModel.findOne({ username }).exec();
      return user; // Esto devolverá un documento de Mongoose que tiene un campo `password`
    } catch (error) {
      throw new Error('Error al obtener el usuario');
    }
  }

  async checkPassword(storedPassword: string, password: string) {
    return bcrypt.compare(password, storedPassword); // Comparando la contraseña encriptada
  }

  // Método para encriptar la contraseña antes de guardarla
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Genera un "sal" de 10 rondas
    const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña
    return hashedPassword;
  }

  // Método para agregar un nuevo usuario
  async registerUser(username: string, password: string) {
    // Verificamos si el usuario ya existe
    const existingUser = await this.getUserByUsername(username);
    if (existingUser) {
      throw new Error('El nombre de usuario ya está en uso');
    }

    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await this.hashPassword(password);

    // Creamos el nuevo usuario y lo guardamos en la base de datos
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    // Guardamos el nuevo usuario en la base de datos
    await newUser.save();

    return newUser; // Devolvemos el nuevo usuario, o puedes devolver solo el id
  }
}
