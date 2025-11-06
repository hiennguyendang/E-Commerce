# 🚀 HƯỚNG DẪN CHẠY VÀ TEST PROJECT E-COMMERCE

## 📋 BƯỚC 1: THIẾT LẬP DATABASE

### 1.1. Khởi tạo schema
```powershell
# Vào thư mục database
cd c:\Users\HAD\Desktop\DB\E-Commerce\database

# Import schema (tạo các bảng)
mysql -u root -p < shopeelike.sql
# Nhập password MySQL của bạn khi được yêu cầu
```

### 1.2. Import dữ liệu mẫu
```powershell
# Import seed data (dữ liệu mẫu)
mysql -u root -p shopeelike < mockup_data_shopeelike.sql
```

### 1.3. Kiểm tra database
```powershell
# Đăng nhập MySQL
mysql -u root -p

# Kiểm tra
USE shopeelike;
SHOW TABLES;
SELECT * FROM user_account;
SELECT * FROM product;
EXIT;
```

---

## 📋 BƯỚC 2: CÀI ĐẶT VÀ CHẠY BACKEND

### 2.1. Cài đặt dependencies
```powershell
# Vào thư mục backend
cd c:\Users\HAD\Desktop\DB\E-Commerce\backend

# Cài đặt các package
npm install
```

### 2.2. Cấu hình file .env
Tạo file `.env` trong thư mục `backend` với nội dung:
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=shopeelike
DB_PORT=3306

# Server
PORT=5000

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Node Environment
NODE_ENV=development
```

**⚠️ LƯU Ý:** Thay `your_mysql_password_here` bằng mật khẩu MySQL thật của bạn!

### 2.3. Chạy backend
```powershell
# Chạy ở chế độ development (tự động restart khi có thay đổi)
npm run dev

# Hoặc chạy bình thường
npm start
```

**✅ Backend chạy thành công khi bạn thấy:**
```
Server running on port 5000
Database connection successful!
```

---

## 📋 BƯỚC 3: CÀI ĐẶT VÀ CHẠY FRONTEND

### 3.1. Cài đặt dependencies
```powershell
# Mở terminal mới, vào thư mục frontend
cd c:\Users\HAD\Desktop\DB\E-Commerce\frontend

# Cài đặt các package
npm install
```

### 3.2. Cấu hình file .env (tùy chọn)
Tạo file `.env` trong thư mục `frontend` với nội dung:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3.3. Chạy frontend
```powershell
# Chạy ở chế độ development
npm start
```

**✅ Frontend sẽ tự động mở trình duyệt tại:** `http://localhost:3000`

---

## 🔐 BƯỚC 4: ĐĂNG NHẬP VÀ TEST

### 4.1. Tài khoản đã có sẵn

#### 🛍️ Tài khoản Seller (Người bán)
- **Email:** `seller1@demo.com`
- **Password:** `password123`
- **Mô tả:** Đã có 3 sản phẩm mẫu (Phone X, Laptop, Headphones)

### 4.2. Tạo tài khoản Buyer (Người mua) mới
```
1. Truy cập http://localhost:3000
2. Click "Đăng ký" (Register)
3. Điền thông tin:
   - Email: buyer1@demo.com
   - Password: password123
   - Display Name: Nguyễn Văn A
   - Phone: +84901234567
4. Click "Đăng ký"
5. Tự động chuyển sang trang đăng nhập
6. Đăng nhập với tài khoản vừa tạo
```

---

## 🧪 BƯỚC 5: CÁC CHỨC NĂNG CẦN TEST

### 5.1. Test Flow Người Mua (Buyer)
```
✅ Đăng ký tài khoản mới
✅ Đăng nhập
✅ Xem danh sách sản phẩm (Home Page)
✅ Lọc sản phẩm theo category (Electronics, Fashion, Home & Living)
✅ Tìm kiếm sản phẩm
✅ Xem chi tiết sản phẩm (click vào sản phẩm)
✅ Thêm vào giỏ hàng (xem toast notification xuất hiện)
✅ Xem giỏ hàng (/cart)
✅ Cập nhật số lượng trong giỏ
✅ Xóa sản phẩm khỏi giỏ
✅ Thanh toán (Checkout)
✅ Xem danh sách đơn hàng (/orders)
✅ Đăng xuất
```

### 5.2. Test Toast Notification
```
1. Thêm sản phẩm vào giỏ → Xem toast màu xanh hiện ở góc phải
2. Toast tự động đóng sau 3 giây
3. Click nút X để đóng toast thủ công
```

### 5.3. Kiểm tra Database sau khi test
```sql
-- Xem buyer vừa tạo
SELECT * FROM user_account WHERE email = 'buyer1@demo.com';
SELECT * FROM buyer;

-- Xem giỏ hàng
SELECT * FROM cart;
SELECT * FROM cart_item;

-- Xem đơn hàng
SELECT * FROM orders;
SELECT * FROM order_item;

-- Xem địa chỉ giao hàng
SELECT * FROM address;
```

---

## 🛠️ TROUBLESHOOTING (Xử lý lỗi)

### ❌ Lỗi "Cannot connect to database"
```
✅ Kiểm tra MySQL đã chạy chưa
✅ Kiểm tra DB_PASSWORD trong backend/.env
✅ Kiểm tra database 'shopeelike' đã được tạo
```

### ❌ Lỗi "Port 5000 is already in use"
```powershell
# Tìm process đang dùng port 5000
netstat -ano | findstr :5000

# Kill process (thay PID bằng số process ID tìm được)
taskkill /PID [PID] /F

# Hoặc đổi PORT trong backend/.env thành 5001
```

### ❌ Lỗi "CORS policy" khi frontend gọi API
```
✅ Kiểm tra backend đang chạy
✅ Kiểm tra REACT_APP_API_URL trong frontend/.env
✅ Restart frontend sau khi thay đổi .env
```

### ❌ Lỗi "jwt malformed" hoặc "Invalid token"
```
✅ Đăng xuất và đăng nhập lại
✅ Xóa localStorage: F12 → Application → Local Storage → Clear
```

---

## 📊 DATABASE SCHEMA OVERVIEW

### Các bảng chính:
- `user_account` - Tài khoản người dùng
- `buyer` - Thông tin người mua
- `seller` - Thông tin người bán
- `admin` - Quản trị viên
- `product` - Sản phẩm
- `product_variant` - Các phiên bản sản phẩm (màu sắc, kích thước)
- `product_image` - Ảnh sản phẩm
- `category` - Danh mục
- `cart` - Giỏ hàng
- `cart_item` - Sản phẩm trong giỏ
- `orders` - Đơn hàng
- `order_item` - Sản phẩm trong đơn hàng
- `address` - Địa chỉ giao hàng
- `shipping_service` - Dịch vụ vận chuyển

---

## 📝 GHI CHÚ

- **Mật khẩu mặc định trong seed data:** `password123`
- **Hashed bằng bcrypt** với cost factor 12
- **JWT token hết hạn sau:** 7 ngày (có thể đổi trong .env)
- **Auto-select variant:** Backend tự động chọn variant rẻ nhất có stock nếu không chỉ định
- **Toast notification:** Tự động đóng sau 3 giây

---

## 🎉 HAPPY TESTING!

Nếu có lỗi, hãy kiểm tra:
1. Console log của backend (terminal chạy backend)
2. Console log của browser (F12 → Console)
3. Network tab (F12 → Network) để xem API responses
