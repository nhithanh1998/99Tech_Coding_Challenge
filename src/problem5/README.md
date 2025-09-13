# Item API

NodeJS TypeScript Server for managing items.

## Features

- Create, list, update, patch, and soft-delete items
- Filter items by category, deletion status, and item name
- MongoDB with Mongoose for persistence
- TypeScript for Item typing

## Prerequisites

- [Node.js](https://nodejs.org/) (\>= 16)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) running locally or a cloud URI

## Setup

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Create a `.env` file in the root with:

    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://nhithanh123vnn:????@clusternhithanh.yolqn4n.mongodb.net/itemDB?retryWrites=true&w=majority&appName=ClusterNhiThanh
    ```

3.  Build and start the server:

    ```bash
    npm run build
    npm start
    ```

    Or with hot reload (development):

    ```bash
    npm run start:dev
    ```

## API Endpoints

### Items

- `POST /items`: Create a new item
- `GET /items`: List items (with filters:
  `?category=string&isDeleted=false&name=itemName`)
- `GET /items/:id`: Get item by ID
- `PUT /items/:id`: Update an item (replace all fields)
- `PATCH /items/:id`: Partially update an item
- `DELETE /items/:id`: Soft delete an item (set `isDeleted: true`)

## Example Request

```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung TV",
    "category": "Television",
    "price": 300
  }'
```

## Development

- Run TypeScript compiler in watch mode:

  ```bash
  npm run tsc:w
  ```

- Lint code:

  ```bash
  npm run lint
  ```
