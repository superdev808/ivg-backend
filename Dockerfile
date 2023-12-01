# Use the official Node.js 16 image as a parent image
FROM node:21

ARG NODE_ENV
ARG MongoDbUri

ENV NODE_ENV=$NODE_ENV
ENV MongoDbUri=$MongoDbUri


# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8000

# The command to run your application
CMD ["node", "src/app.js"]