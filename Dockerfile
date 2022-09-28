FROM node:16.15.1
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
ENV PORT 3003
EXPOSE $PORT
CMD ["npm", "run", "start:prod"]