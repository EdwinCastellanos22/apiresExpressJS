#Use nodejs base the image
FROM node:20-alpine

#create working directory in container
WORKDIR /usr/src/app

#copy package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy the application code
COPY . .

#expose port expressjs
EXPOSE 3000

#define the command to run application
CMD ["npm", "run", "dev"]