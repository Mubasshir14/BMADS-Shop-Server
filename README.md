# BMADS-Shop-Server

## Description


## Features
-**TypeScript** for strong typing and enhanced developer experience.

-**Express.js** for creating the server and APIs.

-**MongoDB** for database management using Mongoose.

-**Environment Variable** management with `dotenv`.

-**Linting and Formatting** with ESLint and Prettier.

-Development server with ts-node-dev for live reload.

-Modular architecture for scalability.

## Prerequisites
Make sure you have the following installed:
- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:
   ```env
   PORT=3000
   DATABASE_URL= your-mongodb-uri
   NODE_ENV=development
   BCRYPT_SALT_ROUND= Any Number
   JWT_ACCESS_SECRET=
   JWT_REFRESH_SECRET=
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=365d
   CLOUDINARY_CLOUD_NAME=dkwn9bool
   CLOUDINARY_API_KEY=321321414891178
   CLOUDINARY_API_SECRET=Gp6xg9-eOc0ylgOInGZ0CLnAfyY
   FROM_EMAIL=NODEMAILER_EMAIL_SENDING
   FROM_PASS=PASSWORD
   ```

## Scripts

- **Start Development Server:**
  ```bash
  npm run start:dev
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Start Production Server:**
  ```bash
  npm run start:prod
  ```

- **Lint Code:**
  ```bash
  npm run lint
  ```

- **Fix Lint Issues:**
  ```bash
  npm run lint:fix
  ```

- **Format Code with Prettier:**
  ```bash
  npm run prettier
  ```

- **Fix Formatting Issues:**
  ```bash
  npm run prettier:fix
  ```

## Folder Structure
```
├── src/
│   ├── app/
│   │   ├── builder/
│   │   │   └── QueryBuilder.ts
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── errors/
│   │   │   ├── AppError.ts
│   │   │   ├── handleZodError.ts
│   │   │   └── handleCastError.ts
│   │   ├── interface/
│   │   │   ├── events.ts
│   │   │   └── index.d.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   └── globalErrorHandler.ts
│   │   ├── route/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── CatchAsync.ts
│   │   │   └── sendResponse.ts
│   ├── module/
│   │   ├── Auth/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Customer/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Product/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Category/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Order/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Review/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── User/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   ├── app.ts
│   ├── server.ts
│   ├── Uploads
├── dist/                   # Compiled JavaScript files
├── .env                    # Environment variables
├── .eslintrc.config.mjs            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Dependencies

### Production:

- `bcrypt`: Library for hashing passwords
- `cookie-parser`: Parse cookies for incoming requests
- `cors`: Enable Cross-Origin Resource Sharing
- `dotenv`: Load environment variables from `.env` file
- `express`: Web framework for building REST APIs
- `http-status`: Manage and use HTTP status codes
- `jsonwebtoken`: Generate and verify JSON Web Tokens (JWT)
- `lint-staged`: Run linters on staged Git files
- `mongoose`: MongoDB object modeling library
- `nodemailer`: Send emails from Node.js
- `zod`: Schema validation library for data

```bash
npm install bcrypt cookie-parser cors dotenv express http-status jsonwebtoken lint-staged mongoose nodemailer  zod
```

### Development:

- `typescript`: TypeScript compiler
- `eslint`: Linting tool for JavaScript/TypeScript
- `prettier`: Code formatter
- `ts-node-dev`: Development server for TypeScript

```bash
  npm install --save-dev @eslint/js @types/bcrypt @types/cookie-parser @types/cors @types/eslint__js @types/express @types/form-data @types/jsonwebtoken @types/node @types/nodemailer eslint globals prettier ts-node-dev typescript typescript-eslint
```

## Contributing
Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** with descriptive messages.
4. **Push your changes** and open a pull request.

---