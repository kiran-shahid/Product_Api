# Product Management API

This is a simple REST API built using NestJS for managing products, with support for basic CRUD operations, searching, and pagination.

## How to Use

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies and run the application:**
   ```bash
   yarn install
   yarn start:dev
   ```

   The API will be running at `http://localhost:3000`.

3. **Run tests:**
   ```bash
   yarn add --dev jest @nestjs/testing
   yarn test
   ```
for services testing 

## API Endpoints

- **POST /products**: Create a new product.
- **GET /products**: Retrieve a list of products with optional pagination.
- **GET /products/:id**: Retrieve a single product by ID.
- **PUT /products/:id**: Update an existing product by ID.
- **DELETE /products/:id**: Delete a product by ID.
- **GET /products/search?query=**: Search products by name.

## Project Structure

- `src/`: Contains all source code.
- `src/products/`: Contains the product-related modules, services, controllers, and DTOs.



