import mongoose, { Schema, Document } from 'mongoose';

// Definimos la interfaz del Usuario
export interface IUser extends Document {
  username: string;
  password: string;
}

// Definimos el esquema para el Usuario
const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Creamos el modelo
export const UserModel = mongoose.model<IUser>('User', userSchema);
