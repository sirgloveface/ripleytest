FROM node
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt update
RUN apt install nano

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .