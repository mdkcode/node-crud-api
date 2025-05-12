# Node CRUD API

A simple Node.js CRUD API built with TypeScript.

## 📁 Project Structure
```text
node-crud-api/
├── src/
│   ├── index.ts              # Main entry point (development)
│   ├── errorHandling.ts      # Error handling utilities
│   ├── utils.ts              # General utility functions/types
│   ├── validation.ts         # Some validation logic
│   ├── userCreateUpdate.ts   # Logic for creating/updating users
│   └── methods.ts            # CRUD method implementations
├── dist/
│   └── index.js        # Compiled JavaScript (production)
├── package.json
├── tsconfig.json
├── .env                # Env file with PORT
├── .gitignore
└── README.md
```

##  Getting Started

### Prerequisites

- Node.js `>=22.14.0`
- npm (Node Package Manager)

### Install Dependencies

```bash
npm install
```
### Running the App

Development Mode
```bash
npm run start:dev
```

This uses ts-node and nodemon to automatically reload the server on file changes.

Production Mode
```bash
npm run start:prod
```

This compiles TypeScript and starts the server from the dist directory.
