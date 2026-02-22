FROM node:25.5.0

WORKDIR /app
COPY ./ /app/

RUN npm install

CMD ["npm", "run", "dev"]