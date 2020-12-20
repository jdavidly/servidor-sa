FROM node:12 
WORKDIR /usr/src/app
COPY * ./
RUN npm install 
COPY . . 
EXPOSE 3000
CMD ["node", "index.js"]