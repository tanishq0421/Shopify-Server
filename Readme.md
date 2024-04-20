# Shopify-Server

Shopify-Server is a Node.js application written in TypeScript, designed to manage the stores of your Shopify account.

## Cloning the Repository

To clone the repository, use the following command:

```shell
    git clone https://github.com/tanishq0421/Shopify-Server.git
```

After Cloning the repo setup your .env file by copying the.env.example in .env and add your shopify credentials to it.

## Running the Application with Docker

1. Ensure you have Docker installed on your machine.
2. Navigate to the root directory of the project.
3. Build the Docker image using the provided Dockerfile:

```shell
   sudo docker build -t my-node-app .
```

Replace my-node-app with your desired image name.

4. Run a container from the built image:

```shell
   sudo docker run -d -p 8000:8000 my-node-app
```

This command runs the container in detached mode (-d), exposing port 8000 on the host machine and mapping it to port 8000 inside the container (-p 8000:8000). Adjust the port mapping if necessary.

5. Verify that the container is running:

```shell
   sudo docker ps -a
```

6. Check the logs of the container to ensure everything works fine or not:

```shell
   sudo docker logs <containerID>
```

## Development Setup

To set up the development environment and run the application locally without Docker, follow these steps:

1. Ensure you have Node.js and Yarn installed on your machine.
2. Navigate to the root directory of the project.
3. Install dependencies:

```shell
   yarn install
```

4. Start the development server:

```shell
   yarn dev
```

This command will start the server using nodemon, which automatically restarts the server when changes are detected.

5. Access the application by navigating to http://localhost:8000 in your web browser.

## License

This project is licensed under the MIT License.
