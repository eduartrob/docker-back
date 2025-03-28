# Usar una imagen base oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto que usa tu backend (ajustar según tu aplicación)
EXPOSE 3050

# Comando para ejecutar la aplicación cuando el contenedor arranque
CMD ["npm", "run", "start"]
