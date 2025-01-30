Project Setup with Shared Library
This guide explains how to set up the system and link the shared library across multiple microservices (e.g., user-service, product-service). The shared library provides reusable code for routes and controllers, simplifying the development and maintenance of the system.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)
npm or yarn (for package management)
Git (for version control)
Directory Structure
Your project should have the following directory structure:

vbnet
Copy
Edit
/
 ├── user-service/
 ├── product-service/
 ├── shared-lib/          # Shared Library with generic controllers and routes
 ├── nginx.config         # NGINX configuration file
 └── package.json
Steps to Set Up the Project
1. Clone the Repository
Start by cloning the repository to your local machine:

bash
Copy
Edit
git clone <repository_url>
cd <project_directory>
2. Install Dependencies for Shared Library
The shared library provides reusable code for controllers and routes. To install the shared library and make it available across your services, follow these steps.

Option 1: Local Development Link (Recommended for local development)
To link the shared library for local development, you can use npm's link feature:

Navigate to the shared-lib directory:

bash
Copy
Edit
cd shared-lib
Run the following command to create a global symlink:

bash
Copy
Edit
npm link
Now, navigate to the user-service and product-service directories and link the shared library:

bash
Copy
Edit
cd ../user-service
npm link shared
Repeat the above steps for the product-service.

Option 2: Publish and Install via NPM (Recommended for production)
If you prefer, you can publish the shared library to an internal or public NPM registry and then install it as a dependency in both user-service and product-service:

3. Configure NGINX
NGINX is used as a reverse proxy and API gateway. Make sure your nginx.config is properly configured to route requests to the correct services.

Example configuration:

nginx
Copy
Edit
# NGINX Configuration for Routing
server {
    listen 8080;

    location /api/users/ {
        proxy_pass http://localhost:3001;  # Point to user service
    }

    location /api/products/ {
        proxy_pass http://localhost:3002;  # Point to product service
    }

    location / {
        return 404 "Service Not Found";
    }
}
4. Set Up User and Product Service
Each service (user-service and product-service) will use the shared library for handling common routes and controllers. Here's how to set it up:

Example for user-service:
Import the generic routes and controllers from the shared library:

javascript
Copy
Edit
import express from 'express';
import genericRoutes from 'shared-lib/dist/generic-router/generic.router';
import genericController from 'shared-lib/dist/generic-controller/generic.controller';
import User from './models/user.model';

const app = express();
app.use(express.json());

const usersController = genericController(User);
const router = genericRoutes(usersController);

app.use("/api/users", router);
Repeat similar steps in product-service, replacing User with the appropriate Product model.

5. Start the Services
To run the services, follow these steps for both the user-service and product-service:

bash
Copy
Edit
cd user-service
npm start
Do the same for product-service:

bash
Copy
Edit
cd product-service
npm start
6. Test the Setup
Once both services are running, you can test the routes using tools like Postman or curl:

User Service:
bash
Copy
Edit
GET http://localhost:8080/api/users/
Product Service:
bash
Copy
Edit
GET http://localhost:8080/api/products/
7. Customization
Modify the routes, controllers, and models as needed in the user-service and product-service directories.
Use the shared library for any additional functionality you wish to reuse across services.
8. Troubleshooting
If you encounter issues with module resolution or imports, double-check the npm link or installation process in both services.
Ensure that the version of the shared library you're linking to or installing is compatible with your services.
For issues with NGINX, make sure the proxy pass URLs and ports are correct.

For Redis configuration , install redis-server in local