# Seleccionar la imagen
FROM node:20-alpine

#Espacio de trabajo
WORKDIR /app

# Copiamos los archivo package
COPY package*.json ./

# Ejecutamos la instalacion de las dependencias
RUN npm install

# Copiamos los demas archivos que estan en el proyecto
COPY . ./

# # Le dice en que puesto se ejecuta
# EXPOSE 3000

# Ejecutamos el proyecto
CMD ["npm", "start"]