FROM node:20-alpine

WORKDIR /app

# Copy shared library first
COPY ./shared-lib /app/shared-lib

# Install shared lib dependencies and create link
WORKDIR /app/shared-lib
RUN npm install && npm link

# Set up user service
WORKDIR /app/user-service
COPY ./user-service /app/
RUN npm install

# Link the shared library
RUN npm link shared

EXPOSE 3002

CMD ["npm", "run" , "dev"]