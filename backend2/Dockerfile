# 1. Usar una imagen base de Node.js (usa la versión que tengas en local, ej. 18 o 20)
FROM node:25-alpine

# 2. Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar archivos de dependencias primero (para aprovechar caché de Docker)
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del código fuente
COPY . .

# 6. Construir la aplicación para producción
RUN npm run build

# 7. Exponer el puerto donde corre Next.js
EXPOSE 3000

# 8. Comando para iniciar la app
CMD ["npm", "start"]