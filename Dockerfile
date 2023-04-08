# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app/electron-react
WORKDIR /electron-react

# Copy the contents of the current directory into the container at /app/electron-react
COPY electron-react/. .

# Install any needed packages specified in package.json
RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_ENV test

# Run the tests
CMD ["npm", "test"]
