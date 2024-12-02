. E-Commerce Analytics API

This project is an API designed for managing an e-commerce platform's analytics, user management, product inventory, and order history 
The project is built using Node.js, Express, and MongoDB.

. Project Setup

. Clone the repository:
   ```bash
   git clone <https://github.com/akshaykamboj89/E-CommerceAnalystic.git>
   cd <E-CommerceAnalystic>

. Install Dependencies:
 using npm install
 

. Technologies Used: 
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT, bcrypt
Environment Management: dotenv


.  Create a .env File:

PORT=5000
MONGO_URI=mongodb://localhost:27017/E-CommerceAnalytics
JWT_SECRET=12345

. Scripts to run :
npm start: Start the server

. API Documentation:
Authentication Endpoints
POST /auth/registerUser - Register a new user
POST /auth/loginUser - Login an existing user and receive a JWT token
POST /admin/adminRegister
POST /admin/adminlogin
Analytics Endpoints
GET /analytics/sales-by-category/authenticateAdmin - Get sales data grouped by product category
GET /analytics/top-customers/authenticateAdmin - Retrieve the top 5 customers by spending
GET /analytics/monthly-sales/authenticateAdmin - View monthly revenue statistics
GET /analytics/low-stock/authenticateAdmin- Fetch a list of products with stock below 10

Order placed byuser

POST("/", authenticateUser, createOrder)
GET('/:userId', authenticateUser, getAllOrders)


Product Management Endpoints
POST /products/add/authenticateAdmin - Add a new product to the inventory
DELETE /products/delete/:id/authenticateAdmin - Remove a product by its ID
GET('/', authenticateAdmin, getAllProducts)
User Endpoints
router.get('/', authenticateAdmin, getAllUsers);








