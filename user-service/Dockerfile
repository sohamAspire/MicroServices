FROM node:20-alpine

WORKDIR /app

# Copy shared library first
COPY ./shared-lib /app/shared-lib

# Install shared lib dependencies and create link
WORKDIR /app/shared-lib
RUN npm install && npm run build && npm link

# Set up user service
WORKDIR /app/user-service
COPY ./user-service /app/user-service

RUN npm install && npm link shared

# To Generate build of user service
RUN npm run build

EXPOSE 3002

CMD ["npm", "run" , "dev"]