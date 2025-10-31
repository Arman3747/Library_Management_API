# 📖 Library Management API with Express, TypeScript, MongoDB, Mongoose & Zod

## Features

- Built with Express, TypeScript, and MongoDB using Mongoose for object modeling.
- Uses Zod for schema validation to ensure data integrity.
- Implements business logic enforcement, such as controlling book availability when borrowed.
- Utilizes MongoDB aggregation pipeline to summarize borrow records.
- Includes Mongoose instance and static methods for reusable logic.
- Uses Mongoose middleware (pre and post hooks) for automated actions.
- Supports filtering, sorting, and pagination for efficient data retrieval and management.

---

## 📚 Book Model

**Fields & Validation:**

| Field       | Type    | Required | Details                                                                       |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------- |
| title       | string  | Yes      | Book’s title                                                                  |
| author      | string  | Yes      | Book’s author                                                                 |
| genre       | string  | Yes      | One of `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY` |
| isbn        | string  | Yes      | Unique International Standard Book Number                                     |
| description | string  | No       | Brief summary or description                                                  |
| copies      | number  | Yes      | Non-negative integer representing total copies available                      |
| available   | boolean | No       | Defaults to `true` — indicates availability                                   |

---

## 📦 Borrow Model

**Fields & Validation:**

| Field    | Type     | Required | Details                                                     |
| -------- | -------- | -------- | ----------------------------------------------------------- |
| book     | ObjectId | Yes      | References the borrowed book’s ID                           |
| quantity | number   | Yes      | Positive integer representing the number of copies borrowed |
| dueDate  | date     | Yes      | Date by which the book must be returned                     |

---

## npm packages

- Uses [TypeScript](https://www.typescriptlang.org/) for type safety, improved code readability, and early error detection during development.
- Uses [Express.js](https://expressjs.com/) for building fast, scalable, and modular server-side APIs.
- Uses [MongoDB](https://www.mongodb.com/) for storing, querying, and managing large volumes of flexible, JSON-like data in web and mobile applications.
- Uses [Mongoose.js](https://mongoosejs.com/) for object modeling, schema enforcement, and easy interaction with MongoDB.
- Uses [Zod](https://zod.dev/) for runtime schema validation and ensuring request data integrity.
- Uses [validator.js](https://www.npmjs.com/package/validator) for validating and sanitizing strings, such as emails, URLs, and ISBNs.
- Uses [.ENV](https://www.npmjs.com/package/dotenv) for loading environment variables from a .env file to securely manage configuration settings like database URLs, API keys, and ports.
- Uses [Vercel](https://vercel.com/) for deploying and hosting the application with automatic scaling and CI/CD support

## Technologies Used

- ![TypeScript](https://img.shields.io/badge/typescript-333333?logo=typescript&logoColor=3178C6)
- ![Express.js](https://img.shields.io/badge/Express.js-v5.01.00-155dfc?logo=express&logoColor=%23000000)
- ![MongoDB](https://img.shields.io/badge/MongoDB-v6.20.00-155dfc?logo=mongodb&logoColor=%2347A248)
- ![Mongoose.js](https://img.shields.io/badge/Mongoose.js-v8.19.02-155dfc?logo=mongoose&logoColor=%23880000)
- ![Zod](https://img.shields.io/badge/Zod-v4.1.12-155dfc?logo=zod&logoColor=%23408AFF)
- ![.ENV](https://img.shields.io/badge/.ENV-v17.2.3-155dfc?logo=dotenv&logoColor=%23ECD53F)
- ![Vercel](https://img.shields.io/badge/Vercel-333333?logo=vercel&logoColor=%23ffffff)
- ![GitHub](https://img.shields.io/badge/GitHub-333333?logo=github&logoColor=%23ffffff)

## 🛠️ Installation & Setup Instructions

Follow the steps below to set up the **NextProduct** application locally:

---

### 1. Clone the Repositories

```bash
git clone https://github.com/Arman3747/Library_Management_API.git

```

---

### 2. Setup

```bash
cd Library_Management_API
npm init --y
```

Create a `.env.local` file in the root of the folder and add the following:

```env
##MongoDB_Credential
MONGODB_URI=mongodb_uri_with_userName_and_password
```

Then start the server:

```bash
npm run dev
```

Open http://localhost:5000 in your browser.

---

## **Route Summary**

```md
# API Route Summary

| Route                                                              | Method | Description                       |
| ------------------------------------------------------------------ | ------ | --------------------------------- |
| `/api/books`                                                       | POST   | Create a new Book                 |
| `/api/books`                                                       | GET    | Get All Books                     |
| `/api/books?filter=NON_FICTION&sortBy=createdAt&sort=desc&limit=5` | GET    | Get All Books Based on the Search |
| `/api/books/:bookId`                                               | GET    | Get Book by ID                    |
| `/api/books/:bookId`                                               | PATCH  | Update Book                       |
| `/api/books/:bookId`                                               | DELETE | Delete a Book                     |
| `/api/borrow`                                                      | POST   | Borrow a Book                     |
| `/api/borrow`                                                      | GET    | Borrowed Books Summary            |
```


## Deployment

1. Push the code to GitHub.
2. Connect your repository to [Vercel](https://vercel.com/).
3. Set environment variables in Vercel dashboard.
4. Deploy the site. Live URL will be generated automatically.

---

### Thank you for Reading!















