#sevsev9/minio-nodejs-file-test
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY data ./
RUN npm install
COPY . .
CMD ["node", "index.js"]

# docker run -p PORT:PORT -v /path/to/config/file.json:/usr/src/app/data/config.json --name=containername sevsev9/minio-nodejs-file-test