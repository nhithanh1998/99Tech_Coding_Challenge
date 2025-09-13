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

- `POST /api/items`: Create a new item
- `GET /api/items`: List items (with filters:
  `?category=string&isDeleted=false&name=itemName`)
- `GET /api/items/:id`: Get item by ID
- `PUT /api/items/:id`: Update an item (replace all fields)
- `PATCH /api/items/:id`: Partially update an item
- `DELETE /api/items/:id`: Soft delete an item (set `isDeleted: true`)

## Example Request

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung TV",
    "category": "Television",
    "price": 300
  }'
```

## For Open API with interaction UI

```bash
http://localhost:3000/api-docs
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
