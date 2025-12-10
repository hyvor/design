FROM node:25.2.1

WORKDIR /app
COPY ./ /app/

RUN npm install

CMD ["npm", "run", "dev"]