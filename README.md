# Food App Backend (Node.js + Express + MongoDB)

REST API backend for a food delivery style application. This service handles:

- Authentication and user accounts
- Restaurant management
- Food item management
- Category management
- Basic order placement flow

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing

## Project Structure

```text
.
|-- config/
|   `-- db.js
|-- controllers/
|-- middlewares/
|-- models/
|-- routes/
|-- categoryRoutes.js
|-- foodRoutes.js
`-- index.js
```

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Installation & Run

```bash
npm install
npm start
```

By default, the server runs on:

```text
http://localhost:5000
```

Base API prefix used in the app:

```text
/api/v1
```

## API Routes

### Health/Test

- `GET /api/v1/test/test-user`

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

Typical register payload:

```json
{
	"userName": "John",
	"email": "john@example.com",
	"password": "secret123",
	"phone": "1234567890",
	"address": ["Street", "City"],
	"answer": "pet-name"
}
```

### User (Protected except reset)

- `GET /api/v1/user/get-user`
- `PUT /api/v1/user/update-user`
- `POST /api/v1/user/update-password`
- `POST /api/v1/user/reset-password`
- `DELETE /api/v1/user/delete-user`

### Restaurant (Protected)

- `POST /api/v1/resturant/create`
- `GET /api/v1/resturant/getAll`
- `GET /api/v1/resturant/get/:id`
- `DELETE /api/v1/resturant/delete/:id`

Typical restaurant payload:

```json
{
	"title": "Food Hub",
	"imageUrl": "https://example.com/cover.jpg",
	"foods": [],
	"time": "20-30 min",
	"pickup": true,
	"delivery": true,
	"isOpen": true,
	"logoUrl": "https://example.com/logo.jpg",
	"rating": 4,
	"ratingCount": "120",
	"code": "FH001",
	"coords": {
		"id": "loc1",
		"latitude": 24.9,
		"latitudeDelta": 0.01,
		"longitude": 67.0,
		"longitudeDelta": 0.01,
		"address": "Main Road",
		"title": "Food Hub"
	}
}
```

### Category

- `POST /api/v1/category/create`
- `GET /api/v1/category/getAll`
- `PUT /api/v1/category/update/:id`
- `DELETE /api/v1/category/delete/:id`

### Food

- `POST /api/v1/food/create` (Protected)
- `GET /api/v1/food/getAll`
- `GET /api/v1/food/get/:id`
- `GET /api/v1/food/getByRestaurant/:id`
- `PUT /api/v1/food/update/:id` (Protected)
- `DELETE /api/v1/food/delete/:id` (Protected)
- `POST /api/v1/food/placeOrder` (Protected)
- `POST /api/v1/food/orderStatus/:id` (Protected)

Typical food payload:

```json
{
	"title": "Burger",
	"description": "Beef burger",
	"price": 12,
	"imageUrl": "https://example.com/burger.jpg",
	"foodtags": "fast-food",
	"category": "burger",
	"code": "BG001",
	"isAvailable": true,
	"resturant": "<restaurantObjectId>",
	"rating": 4
}
```

## Auth Header

For protected endpoints, send:

```http
Authorization: Bearer <token>
```

## Data Models (High Level)

- User: `userName`, `email`, `password`, `address`, `phone`, `usertype`, `profile`, `answer`
- Restaurant: `title`, `imageUrl`, `foods`, `time`, `pickup`, `delivery`, `isOpen`, `logoUrl`, `rating`, `ratingCount`, `code`, `coords`
- Category: `title`, `imageUrl`
- Food: `title`, `description`, `price`, `imageUrl`, `foodTags`, `category`, `code`, `isAvailable`, `resturant`, `rating`, `ratingCount`
- Order: `foods`, `payment`, `buyer`, `status`

## Current Implementation Notes

The major runtime issues were fixed:

- Missing route files in `routes/` were added (`categoryRoutes.js`, `foodRoutes.js`, `orderRoutes.js`).
- Auth route export and middleware token parsing were corrected.
- Controller typos and missing imports that caused crashes were fixed.

There are still duplicate legacy route files at the project root (`categoryRoutes.js`, `foodRoutes.js`) that are not used by `index.js`. They can be removed in a cleanup pass.