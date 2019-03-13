FROM node:slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Define environment variable
ENV NODE_ENV=production

# Install any needed packages specified in requirements.txt
RUN cd /app/front && npm install --production && npm run-script build && cd /app/back && npm install --production

# Run app.py when the container launches
CMD cd /app/back && npm start

# Make port 80 available to the world outside this container
EXPOSE 5000