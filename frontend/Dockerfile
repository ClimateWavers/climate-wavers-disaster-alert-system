# This tells us the version of node image we want to use.

FROM node:lts-alpine

# This tells Docker to create a directory so that other commands will use it
WORKDIR /app
ENV npm_config_cache=/app
#Copy Our package.json and package-lock.json file into the app directory to tell node the module we want to use
COPY package.json /app

#To install the dependencies inside our image

RUN npm install
EXPOSE 5173

# Copy everything from our local directory to the image
COPY . /app

CMD [ "npm", "run", "dev" ]