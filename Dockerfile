FROM node:lts-buster
RUN git clone https://github.com/YosafN/YOUSAF-BALOCH-MD/root/YOUSAF-BALOCH-MD
WORKDIR /root/YOUSAF-BALOCH-MD
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
