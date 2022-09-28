FROM node:16.15.1                       // phien ban node chay duoc
WORKDIR /usr/code                       // noi lam viec
COPY package.json .                     // sao chep file
RUN npm install                         // keo package
COPY . .                                // copy toan bo file tu folder hien tai dua vao trong /usr/code
EXPOSE 3002                             // port
CMD ["npm", "run", "start:prod"]        // chi dinh lenh lam viec







### run docker
docker-compose up -d --build
docker ps
docker logs nodeappcontainer