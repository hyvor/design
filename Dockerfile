FROM node:24.11.1

WORKDIR /app
COPY ./ /app/

RUN npm install

CMD ["npm", "run", "dev"]