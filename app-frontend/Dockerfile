# Imagen base de Node.js
FROM node:20-alpine as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que el servidor de desarrollo correrá
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
