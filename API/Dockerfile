# Official Image using node 20 alphine
FROM node:latest 

# working directory 
WORKDIR /app

# Changes in package* . json file 
COPY package.json ./

# Install Dependencies
RUN npm install

# Install Node.js and npm from the first stage
# Copy all changes on fronted
COPY . .

# expose the app on port 4000
EXPOSE 4000

# Start your frontend application
CMD [ "npm", "run", "dev"]