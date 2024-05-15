# Official Image using node 20 alphine
FROM node:latest 

# working directory 
WORKDIR /app

# Changes in package* . json file 
COPY package*.json ./

# Install Dependencies
RUN npm install

# Install Node.js and npm from the first stage
# Copy all changes on fronted
COPY . .

# expose the app on port 5173
EXPOSE 5173

# Start your frontend application
CMD [ "npm", "run", "dev"]