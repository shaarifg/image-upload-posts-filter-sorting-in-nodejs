# Node.js REST API Project

**Table of Contents**

- [Installation](#installation)
- [Libraries Used](#libraries-used)
- [API Documentation](#api-documentation)

## Getting Started

Follow these instructions to set up and run the project

### Installation

1. **Clone the Repository:**

   Clone the project repository:

   ```bash
   git clone https://github.com/shaarifg/image-upload-posts-filter-sorting-in-nodejs.git
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
| `cloudinary`         | Used for image upload on clound to get public url. Cloudinary is a cloud-based solution for storing data.                     |
| `dotenv`             | Used for managing environment variables.                                                              |
| `express`            | Used for building the rest APIs.                                                            |
| `express-fileupload` | Used for handling file uploads. Express File Upload is a middleware for handling file uploads in Express applications.                                                                                  |
| `joi`                | Used for request data validation.                                                                   |
| `mongoose`           | Used for interacting with MongoDB. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.                                                                               |
| `nodemon`            | Used for automatic server restarts during development. |

## API Documentation

Here are the available API endpoints with their descriptions, request methods, example API usage, and response descriptions.


| Endpoint        | Description                                   | Request Method | Example API                                      | Response Description                           |
| --------------- | --------------------------------------------- | -------------- | -----------------------------                    | ---------------------------------------------- |
| `/`             | Home route                                    | `GET`          | `/`                                              | Returns a greeting message.                    |
| `/posts`        | Create a new post and save it to the database | `POST`         | `http://localhost:8080/posts`                     | Creates a new post and returns the saved post. |
| `/posts`        | Get all the posts                             | `GET`          | `http://localhost:8080/posts`                      | Returns a list of all posts.                   |
| `/search/posts` | Search posts by title and description         | `GET`          | `http://localhost:8080/search/posts?search`      | Searches for posts matching the search keyword. |
| `/upload`       | Upload an image                               | `POST`         | `/upload`                                        | Uploads an image and returns the image URL.    |
| `/tags/posts`       | Filter posts by tags           | `GET`          | `http://localhost:8080/tags/posts`    | Filters and returns posts based on specified tags. Need to provide json body object |

### Home Route

- **Endpoint:** `/`
- **Description:** This is the home route, which provides a simple greeting message.
- **Request Method:** `GET`
- **Example API:** `GET /`
- **Response Description:** Returns a greeting message.

### Create a Post

- **Endpoint:** `/posts`
- **Description:** Create a new post and save it to the database.
- **Request Method:** `POST`
- **Example API:** `POST /posts`
- **Response Description:** Creates a new post and returns the saved post.

### Get All Posts also support filter queries

- **Endpoint:** `/posts`
- **Description:** Get all the posts stored in the database.
- **Request Method:** `GET`
- **Example API:** `GET /posts`
- **Response Description:** Returns a list of all posts.


### Search Posts

- **Endpoint:** `/search/posts`
- **Description:** Search for posts using keywords found in the title and description.
- **Request Method:** `GET`
- **Example API:** `GET /search/posts?search=keyword`
- **Response Description:** Searches for posts matching the query keyword.
### Get All Posts filtered with provided tags

- **Endpoint:** `tags/posts`
- **Description:** Get all the posts stored in the database.
- **Request Method:** `GET`
- **Example API:** `GET /tags/posts`
- **json body Object**:{
   "tags":[]
}
- **Response Description:** Returns a list of all posts with specified tags.


### Upload Image

- **Endpoint:** `/upload`
- **Description:** Upload an image to the server or cloud storage (e.g., Cloudinary).
- **Request Method:** `POST`
- **Example API:** `POST /upload`
- **Response Description:** Uploads an image and returns the uploded image data with public url.

