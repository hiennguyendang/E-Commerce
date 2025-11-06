# 🛍️ ShopeeeLike E-Commerce Platform

A full-stack e-commerce application built with React.js frontend and Node.js backend, using MySQL database with **shopeelike schema**.

## ⚡ QUICK START (5 phút để chạy)

### Bước 1: Setup Database
```powershell
cd database
mysql -u root -p < shopeelike.sql
mysql -u root -p shopeelike < mockup_data_shopeelike.sql
mysql -u root -p shopeelike < insert_categories.sql
cd ..
```

### Bước 2: Setup Backend
```powershell
cd backend
npm install
copy .env.example .env
# ⚠️ Mở file .env và sửa:
#    DB_PASSWORD=your_mysql_password
#    JWT_SECRET=your-secret-key-change-in-production
npm run dev
```

### Bước 3: Setup Frontend (Terminal mới)
```powershell
cd frontend
npm install
npm start
```

### Bước 4: Test 🎉
- Mở browser: **http://localhost:3000**
- Đăng nhập: **seller1@demo.com** / **password123**
- Hoặc đăng ký tài khoản buyer mới

---

## 🔐 TÀI KHOẢN CÓ SẴN

| Email | Password | Role | Ghi chú |
|-------|----------|------|---------|
| seller1@demo.com | password123 | Seller | Đã có 3 sản phẩm mẫu (Phone, Laptop, Headphones) |

*(Bạn có thể đăng ký tài khoản buyer mới từ UI)*

---

## 📚 Tài liệu đầy đủ

👉 Xem file **HƯỚNG_DẪN_CHẠY_PROJECT.md** để có hướng dẫn chi tiết từng bước!

---

## 🏗️ Project Structure

```
E-Commerce/
├── backend/
│   ├── src/
│   │   ├── server.js          # Entry point
│   │   ├── config/
│   │   │   └── database.js    # MySQL connection
│   │   ├── middleware/
│   │   │   └── auth.js        # JWT verification với shopeelike schema
│   │   ├── routes/
│   │   │   ├── auth.js        # Register/Login (user_account + buyer)
│   │   │   ├── products.js    # Product với variants & images
│   │   │   ├── cart.js        # Cart với variant support
│   │   │   ├── orders.js      # Orders với address & shipping
│   │   │   └── categories.js  # Category listing
│   │   └── ...
│   ├── package.json
│   └── .env.example           # ⭐ Copy thành .env và điền password
│
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main routing + Toast notifications
│   │   ├── components/
│   │   │   ├── auth/          # Login/Register forms
│   │   │   ├── cart/          # Cart components
│   │   │   ├── product/       # Product cards & filters
│   │   │   ├── layout/        # Header/Footer
│   │   │   └── common/        # Toast, Button, Modal
│   │   ├── pages/
│   │   │   ├── HomePage.jsx            # Product listing với filters
│   │   │   ├── ProductDetailPage.jsx   # Chi tiết sản phẩm
│   │   │   ├── CartPage.jsx            # Giỏ hàng
│   │   │   ├── CheckoutPage.jsx        # Thanh toán
│   │   │   └── OrdersPage.jsx          # Lịch sử đơn hàng
│   │   └── utils/
│   │       ├── api.js         # API functions
│   │       └── axiosConfig.js # Axios setup với interceptors
│   ├── package.json
│   └── .env.example
│
├── database/
│   ├── shopeelike.sql         # ⭐ Main schema (user_account, product_variant, orders...)
│   └── mockup_data_shopeelike.sql  # ⭐ Seed data (seller + 3 products)
│
├── HƯỚNG_DẪN_CHẠY_PROJECT.md  # ⭐⭐ Đọc file này để biết chi tiết!
└── README.md                   # File này

## 🚀 Quick Start (Cách cũ - chưa cập nhật shopeelike schema)

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### ⚠️ LƯU Ý: SỬ DỤNG HƯỚNG DẪN TRÊN ĐỂ CHẠY VỚI SHOPEELIKE SCHEMA MỚI!

-- Import schema and sample data
mysql -u root -p shopeelike < database/schema.sql
mysql -u root -p shopeelike < database/mockup_data.sql
```

### 3. Environment Configuration

Copy and configure the environment file:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=shopeelike
JWT_SECRET=your_super_secret_jwt_key_here
```

### 4. Run the Application

#### Development Mode (Both servers)
```bash
npm run dev
```

#### Individual Servers
```bash
# Backend only (http://localhost:5000)
npm run server

# Frontend only (http://localhost:3000)
npm run client
```

## 📁 Backend API Structure

```
backend/src/
├── server.js          # Main server file
├── config/
│   └── database.js    # Database connection
├── routes/            # API routes
│   ├── auth.js       # Authentication routes
│   ├── products.js   # Product management
│   ├── categories.js # Category management
│   ├── cart.js       # Shopping cart
│   ├── orders.js     # Order management
│   ├── users.js      # User management
│   └── admin.js      # Admin functions
├── controllers/       # Business logic
├── models/           # Database models
├── middleware/       # Custom middleware
└── utils/           # Utility functions
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products (with pagination & filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products

### Categories
- `GET /api/categories` - Get all categories

## 🛠️ Available Scripts

### Root Level
- `npm run dev` - Run both frontend and backend in development mode
- `npm run server` - Run backend server only
- `npm run client` - Run frontend only
- `npm run build` - Build frontend for production
- `npm run install-all` - Install all dependencies

### Backend (`cd backend`)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend (`cd frontend`)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=shopeelike

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

## 📱 Frontend Configuration

The frontend is configured to communicate with the backend API. Update `frontend/src/utils/axiosConfig.js` if needed.

## 🗄️ Database Schema

The database schema includes:
- **Users** - customers, sellers, admins with authentication
- **Products** - product catalog with images, reviews, ratings
- **Categories** - hierarchical product categories
- **Shopping Cart** - persistent cart items
- **Orders** - order management with items and shipping
- **Reviews** - product reviews and ratings system

### 📊 Sample Data Included:
- **20+ Products** across multiple categories (Electronics, Fashion, Home, Sports, Books)
- **Multiple Users** - Admin, Sellers, Customers (password: 123456)
- **Categories** - Electronics, Fashion, Home & Living, Sports, Books, etc.
- **Sample Orders** - Complete order history with items
- **Product Reviews** - Real reviews with ratings
- **Product Images** - High-quality product images from Unsplash

## 🚢 Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production database
3. Deploy to your preferred platform (Heroku, DigitalOcean, AWS, etc.)

### Frontend Deployment
1. Run `npm run build` in frontend directory
2. Deploy the `build` folder to static hosting (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 User Guide

### 🔐 Authentication System

#### Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com", 
  "password": "your_password"
}
```

### 🛍️ Shopping Flow

#### 1. Browse Products
- **View all products**: `GET /api/products`
- **Search products**: `GET /api/products?search=iphone`
- **Filter by category**: `GET /api/products?category=1`
- **Filter by price**: `GET /api/products?minPrice=1000000&maxPrice=5000000`
- **Sort products**: `GET /api/products?sort=price&order=ASC`
- **Pagination**: `GET /api/products?page=2&limit=12`

#### 2. View Product Details
```bash
GET /api/products/1
```
Returns:
- Product information
- Product images
- Customer reviews
- Seller information
- Category details

#### 3. Add to Cart
```bash
POST /api/cart/items
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}
```

#### 4. Manage Cart
- **View cart**: `GET /api/cart`
- **Update quantity**: `PUT /api/cart/items/1` with `{"quantity": 3}`
- **Remove item**: `DELETE /api/cart/items/1`
- **Clear cart**: `DELETE /api/cart`

#### 5. Create Order
```bash
POST /api/orders
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "payment_method": "cod",
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+84901234567",
    "address": "123 Main Street",
    "city": "Ho Chi Minh City",
    "postal_code": "700000",
    "country": "Vietnam"
  }
}
```

### 👤 Sample User Accounts

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Admin | admin@shopeelike.com | 123456 | Full system access |
| Seller | seller1@techstore.com | 123456 | Manage products |
| Seller | seller2@fashionhub.com | 123456 | Fashion products |
| Customer | customer1@gmail.com | 123456 | Regular shopper |
| Customer | customer2@yahoo.com | 123456 | Regular shopper |

### 📱 Frontend Integration Examples

#### React Login Component
```javascript
import { authAPI, setAuthData } from '../utils/api';

const handleLogin = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    const { token, user } = response.data;
    
    setAuthData(token, user);
    // Redirect to dashboard or home page
  } catch (error) {
    console.error('Login failed:', error.response.data.error);
  }
};
```

#### React Product List Component
```javascript
import { productsAPI } from '../utils/api';

const fetchProducts = async (filters = {}) => {
  try {
    const response = await productsAPI.getAll(filters);
    setProducts(response.data.products);
    setPagination(response.data.pagination);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};

// Usage with filters
fetchProducts({
  search: 'phone',
  category: 1,
  minPrice: 1000000,
  maxPrice: 30000000,
  page: 1,
  limit: 12
});
```

#### React Cart Component
```javascript
import { cartAPI } from '../utils/api';

const addToCart = async (productId, quantity = 1) => {
  try {
    await cartAPI.addItem(productId, quantity);
    // Show success message
    await fetchCart(); // Refresh cart
  } catch (error) {
    console.error('Failed to add to cart:', error.response.data.error);
  }
};
```

### � Common Use Cases

#### Customer Journey
1. **Register/Login** → Get authentication token
2. **Browse Products** → View product catalog with filters
3. **Add to Cart** → Select products and quantities
4. **Checkout** → Create order with shipping details
5. **Track Orders** → View order history and status

#### Admin/Seller Journey
1. **Login** → Access admin/seller dashboard
2. **Manage Products** → Create, update, delete products
3. **View Orders** → Monitor and fulfill orders
4. **Analytics** → View sales reports and statistics

### 🔧 Testing APIs

#### Using cURL
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Get products
curl -X GET http://localhost:5000/api/products

# Get product by ID
curl -X GET http://localhost:5000/api/products/1

# Add to cart (requires token)
curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"product_id":1,"quantity":2}'
```

#### Using Postman
1. **Import Collection**: Create a new collection in Postman
2. **Set Base URL**: `http://localhost:5000/api`
3. **Add Authorization**: Use Bearer Token for protected routes
4. **Test Endpoints**: Start with auth/login to get token

### 💡 Tips & Best Practices

#### Security
- Always use HTTPS in production
- Set strong JWT secrets
- Implement rate limiting
- Validate all user inputs
- Use prepared statements for database queries

#### Performance
- Use pagination for large datasets
- Implement caching for frequently accessed data
- Optimize database queries with indexes
- Use connection pooling for database

#### Error Handling
- Always check for error responses
- Implement proper error boundaries in React
- Log errors for debugging
- Provide user-friendly error messages

### 🚨 Troubleshooting

#### Common Issues

**Database Connection Failed**
```bash
# Check MySQL service
net start mysql

# Verify credentials in .env file
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=shopeelike
```

**Token Expired/Invalid**
- Check JWT_SECRET in .env
- Verify token format (Bearer token)
- Check token expiration time

**CORS Issues**
- Ensure FRONTEND_URL is set correctly in backend .env
- Check browser network tab for CORS errors

**Port Already in Use**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

## �🆘 Support

If you encounter any issues, please check:
1. MySQL server is running
2. Database is created and imported
3. Environment variables are correctly set
4. All dependencies are installed
5. Ports 3000 (frontend) and 5000 (backend) are available

### 📞 Getting Help
- Check the console logs for detailed error messages
- Verify API responses using browser DevTools
- Test APIs independently using Postman or cURL
- Ensure all required fields are provided in requests

For more help, create an issue in the repository with:
- Error messages
- Steps to reproduce
- Environment details (OS, Node version, MySQL version)

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
