FROM node:26-alpine

WORKDIR /app

# copiamos el archivo server.js y el package.json juntos
COPY package*.json .

# instalamos las dependencias
RUN npm install

# si hay cambios en app.js, hace que no se vuelvan a instalar las dependencias, ya que va por capas
COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]