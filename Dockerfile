FROM node:20.10-slim
WORKDIR /root/node-blog-app/
COPY app/ .
RUN npm install
CMD [ "node", "app.js" ]