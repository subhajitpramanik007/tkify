# TKIFY - Real-Time Chat App

TKIFY is a real-time chat application built with **React**, **Vite**, **Express (Node.js)**, and **MongoDB**. This app allows users to send and receive messages in real time. It uses WebSockets (Socket.io) for real-time communication between clients and the backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [With Docker](#with-docker)
  - [Without Docker](#without-docker)

## Features

- Real-time messaging using **Socket.io**
- User authentication (JWT)
- MongoDB-based data storage for users and messages
- Cross-platform support (works on both desktop and mobile)

## Technologies Used

- **Frontend**: React, Vite, Socket.io client
- **Backend**: Node.js, Express, Socket.io, JWT for authentication
- **Database**: MongoDB
- **Containerization**: Docker (optional)
- **Authentication**: JWT (JSON Web Token)

---

## Getting Started

### With Docker

1. **Clone the repository**:

   ```bash
   git clone https://github.com/subho-1011/tkify.git
   cd tkify
   ```

2. **Modify docker-compose.yml file**:

    You can change **environment variables** - `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`
    Optional add `CLOUDINARY` api keys

    ```yaml
    version: '3.8'

    services:
      client:
          build:
            context: ./client
          ports:
            - "3000:80"
          environment:
            - VITE_API_URL=http://localhost:8080
          depends_on:
            - server
          networks:
            - tkify-net

      server:
          build:
            context: ./server
          ports:
            - "8080:8080"
          environment:
            - CORS_ORIGINS=http://localhost:3000
            - MONGO_URI=mongodb://mongo:27017/tkify
            - PORT=8080
            - NODE_ENV=development
            - ACCESS_TOKEN_SECRET=your_access_token_secret
            - ACCESS_TOKEN_EXPIRES=1h
            - REFRESH_TOKEN_SECRET=your_refresh_token_secret
            - REFRESH_TOKEN_EXPIRES=30d
            - CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
            - CLOUDINARY_API_KEY=your_cloudinary_api_key
            - CLOUDINARY_API_SECRET=your_cloudinary_api_secret
          depends_on:
            - mongo
          networks:
            - tkify-net

      mongo:
        image: mongo:latest
          container_name: mongo
        ports:
          - "27017:27017"
        volumes:
          - mongo-data:/data/db
        networks:
          - tkify-net

    networks:
      tkify-net:
          driver: bridge

    volumes:
      mongo-data:
    ```

3. **Build and start the containers using Docker Compose**:

    Make sure Docker is installed on your machine. If not, [Download and install Docker from the official website](https://www.docker.com/get-started).

    Run the following command in the root directory of the project:

    ```bash
    docker-compose up --build
    ```

    Docker Compose will build and start the following services:

    - `client`: The frontend (React + Vite)
    - `server`: The backend (Express + Node.js)
    - `mongo`: A MongoDB instance

4. **Access the application**:
    Once the containers are running, you can access the application by visiting [http://localhost:3000](http://localhost:3000) for the frontend.

### Without Docker

1. **Clone the repository**:

    ```bash
    git clone https://github.com/subho-1011/tkify.git
    cd tkify
    ```

2. **Install dependencies**:

    Navigate to the `client` and `server` directories and install the required dependencies:

    ```bash
    # In the client directory
    cd client
    npm install

    # In the server directory
    cd ../server
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the `server` directory and add the following environment variables:

    ```bash
    PORT=8080
    NODE_ENV=development
    CORS_ORIGINS=http://localhost:3000
    
    # For MongoDB Atlas
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tkify?retryWrites=true&w=majority

    # For local MongoDB
    MONGO_URI=mongodb://localhost:27017/tkify
    
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRES=1h
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRES=30d
    
    # for send images (optional)   
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

   Create a `.env` file in the `client` directory and add the following environment variables:

    ```env
    VITE_API_URL=http://localhost:8080
    ```

4. **Start the backend server**:

    In the `server` directory, run the following command to start the backend server:

    ```bash
    npm run build
    npm run start
    ```

5. **Start the frontend development server**:

    In a new terminal, navigate to the `client` directory and run the following command to start the frontend development server:

    ```bash
    npm run dev
    ```

6. **Access the application**:

    Once both the frontend and backend servers are running, you can access the application by visiting [http://localhost:3000](http://localhost:3000) for the frontend.

## Contributing

We welcome contributions to improve TKIFY. If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request on the [GitHub repository](https://github.com/subho-1011/tkify.git).

Happy Coding!
Thank you for using TKIFY!