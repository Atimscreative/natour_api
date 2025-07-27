# Natour API

A RESTful API for managing tours and users, built with Node.js and Express.

## 📋 Description

Natour API is a backend service that provides endpoints for managing tour data and user information. It includes features like CRUD operations for tours, user management, and static file serving.

## 🚀 Features

- **Tour Management**: Create, read, update, and delete tours
- **User Management**: Handle user data and operations
- **Static File Serving**: Serve static assets (CSS, images, HTML)
- **Environment Configuration**: Support for different environments (development/production)
- **Request Logging**: Morgan middleware for request logging in development

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Morgan** - HTTP request logger middleware
- **dotenv** - Environment variable management

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Natour-API
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `config.env` file in the root directory:

   ```env
   NODE_ENV=development
   PORT=3000
   ```

4. **Start the server**

   ```bash
   # Development mode
   npm start

   # Production mode
   npm run serve
   ```

## 🌐 API Endpoints

### Tours

- `GET /api/v1/tours` - Get all tours
- `POST /api/v1/tours` - Create a new tour
- `GET /api/v1/tours/:id` - Get a specific tour
- `PATCH /api/v1/tours/:id` - Update a tour
- `DELETE /api/v1/tours/:id` - Delete a tour

### Users

- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users/:id` - Get a specific user
- `PATCH /api/v1/users/:id` - Update a user
- `DELETE /api/v1/users/:id` - Delete a user

## 📁 Project Structure

```
Natour API/
├── app.js                 # Main application file
├── server.js             # Server entry point
├── package.json          # Dependencies and scripts
├── controllers/          # Route controllers
│   ├── tourController.js
│   └── userController.js
├── routes/               # Route definitions
│   ├── tourRoutes.js
│   └── userRoutes.js
├── dev-data/            # Development data
│   └── data/
│       ├── tours.json
│       ├── tours-simple.json
│       ├── users.json
│       └── reviews.json
└── public/              # Static files
    ├── css/
    ├── img/
    └── overview.html
```

## 🔧 Scripts

- `npm start` - Start the development server with nodemon
- `npm run serve` - Start the production server

## 📝 Usage Examples

### Get All Tours

```bash
curl http://localhost:3000/api/v1/tours
```

### Create a New Tour

```bash
curl -X POST http://localhost:3000/api/v1/tours \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mountain Adventure",
    "price": 299,
    "duration": 7
  }'
```

### Get a Specific Tour

```bash
curl http://localhost:3000/api/v1/tours/1
```

## 🔒 Environment Variables

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 3000)

## 📄 License

ISC License

## 👨‍💻 Author

[Your Name]

---

**Note**: This is a development project. For production use, ensure proper security measures, error handling, and database integration.
