FROM node:20-alpine

WORKDIR /app

# Copy shared library first
COPY ./shared-lib /app/shared-lib

# Install shared lib dependencies and create link
WORKDIR /app/shared-lib
RUN npm install && npm run build && npm link

# Set up user service
WORKDIR /app/product-service
COPY ./product-service /app/product-service
RUN npm install && npm link shared

# To Generate build of product service
RUN npm run build

EXPOSE 3001

CMD ["npm", "run" , "dev"]