# Node.js REST API Project

**Table of Contents**

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Libraries Used](#libraries-used)
- [API Documentation](#api-documentation)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Installation

1. **Clone the Repository:**

   Clone the project repository to your local machine using Git:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **To run the code:**

```bash
   npm install
```

```bash
   npm start
```

## Libraries Used

| Library              | Description                                                                                                                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cloudinary`         | Used for image and video management. Cloudinary is a cloud-based solution for storing, managing, and delivering images and videos. It simplifies the process of handling media files in the application.                                                                                                |
| `dotenv`             | Used for managing environment variables. Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`, making it easy to configure your application without hardcoding sensitive information.                                                              |
| `express`            | Used for building the web application. Express is a popular web application framework for Node.js. It simplifies the development of web applications and APIs, providing a robust foundation for building routes and handling HTTP requests.                                                            |
| `express-fileupload` | Used for handling file uploads. Express File Upload is a middleware for handling file uploads in Express applications. It facilitates the processing of uploaded files and integrates seamlessly with Express routes.                                                                                   |
| `joi`                | Used for request data validation. Joi is a powerful validation library for JavaScript. It is commonly used to validate incoming request data, ensuring that data is properly formatted and meets specific criteria before processing.                                                                   |
| `mongoose`           | Used for interacting with MongoDB. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It simplifies database interactions, providing a higher-level interface for working with MongoDB databases.                                                                               |
| `nodemon`            | Used for automatic server restarts during development. Nodemon is a utility that monitors changes in your Node.js application and automatically restarts the server. This is invaluable during development, as it saves time by eliminating the need to manually restart the server after code changes. |

## API Documentation

Here are the available API endpoints with their descriptions and request methods.

| Endpoint        | Description                                   | Request Method |
| --------------- | --------------------------------------------- | -------------- |
| `/`             | Home route                                    | `GET`          |
| `/posts`        | Create a new post and save it to the database | `POST`         |
| `/posts`        | Get all the posts                             | `GET`          |
| `/search/posts` | Search posts by title and description         | `GET`          |
| `/upload`       | Upload an image                               | `POST`         |

### Home Route

- **Endpoint:** `/`
- **Description:** This is the home route, which provides a simple greeting message.
- **Request Method:** `GET`

### Create a Post

- **Endpoint:** `/posts`
- **Description:** Create a new post and save it to the database.
- **Request Method:** `POST`

### Get All Posts

- **Endpoint:** `/posts`
- **Description:** Get all the posts stored in the database.
- **Request Method:** `GET`

### Search Posts

- **Endpoint:** `/search/posts`
- **Description:** Search for posts using keywords found in the title and description.
- **Request Method:** `GET`

### Upload Image

- **Endpoint:** `/upload`
- **Description:** Upload an image to the server or cloud storage (e.g., Cloudinary).
- **Request Method:** `POST`
