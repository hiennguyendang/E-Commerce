-- ============================================
-- MOCKUP DATA FOR SHOPEELIKE E-COMMERCE
-- ============================================
USE shopeelike;

-- ============================================
-- INSERT USERS (Admin, Sellers, Customers)
-- ============================================
INSERT INTO users (email, password, first_name, last_name, phone, role, address, city, postal_code, email_verified) VALUES
-- Admin
('admin@shopeelike.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Admin', 'System', '+84901234567', 'admin', '123 Admin Street', 'Ho Chi Minh City', '700000', TRUE),

-- Sellers
('seller1@techstore.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Nguyen', 'Tech Store', '+84901111111', 'seller', '456 Technology Avenue', 'Ho Chi Minh City', '700001', TRUE),
('seller2@fashionhub.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Tran', 'Fashion Hub', '+84902222222', 'seller', '789 Fashion Street', 'Ha Noi', '100000', TRUE),
('seller3@homegoods.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Le', 'Home & Living', '+84903333333', 'seller', '321 Home Avenue', 'Da Nang', '550000', TRUE),
('seller4@sportsworld.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Pham', 'Sports World', '+84904444444', 'seller', '654 Sports Boulevard', 'Ho Chi Minh City', '700002', TRUE),
('seller5@bookstore.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Vo', 'Book Paradise', '+84905555555', 'seller', '987 Literature Lane', 'Ha Noi', '100001', TRUE),

-- Customers  
('customer1@gmail.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Minh', 'Nguyen', '+84911111111', 'customer', '123 Customer Street', 'Ho Chi Minh City', '700010', TRUE),
('customer2@yahoo.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Linh', 'Tran', '+84922222222', 'customer', '456 Buyer Avenue', 'Ha Noi', '100010', TRUE),
('customer3@hotmail.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Duc', 'Le', '+84933333333', 'customer', '789 Shopping Street', 'Da Nang', '550010', TRUE),
('customer4@gmail.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Huong', 'Pham', '+84944444444', 'customer', '321 User Road', 'Can Tho', '900000', TRUE),
('customer5@gmail.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Nam', 'Vo', '+84955555555', 'customer', '654 Client Circle', 'Hai Phong', '180000', TRUE);

-- ============================================
-- INSERT CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, image_url, is_active, sort_order) VALUES
('Electronics', 'electronics', 'Latest electronic devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', TRUE, 1),
('Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400', TRUE, 2),
('Home & Living', 'home-living', 'Furniture and home decoration items', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', TRUE, 3),
('Sports & Outdoors', 'sports-outdoors', 'Sports equipment and outdoor gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', TRUE, 4),
('Books & Media', 'books-media', 'Books, magazines, and entertainment media', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', TRUE, 5),
('Beauty & Personal Care', 'beauty-personal-care', 'Cosmetics and personal care products', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', TRUE, 6),
('Toys & Games', 'toys-games', 'Toys, games, and entertainment for kids', 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400', TRUE, 7),
('Automotive', 'automotive', 'Car accessories and automotive products', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', TRUE, 8);

-- Add subcategories
INSERT INTO categories (name, slug, description, parent_id, is_active, sort_order) VALUES
-- Electronics subcategories
('Smartphones', 'smartphones', 'Mobile phones and accessories', 1, TRUE, 1),
('Laptops', 'laptops', 'Notebooks and laptop computers', 1, TRUE, 2),
('Headphones', 'headphones', 'Audio equipment and headphones', 1, TRUE, 3),
('Smart Watches', 'smart-watches', 'Wearable technology', 1, TRUE, 4),

-- Fashion subcategories  
('Men Clothing', 'men-clothing', 'Clothing for men', 2, TRUE, 1),
('Women Clothing', 'women-clothing', 'Clothing for women', 2, TRUE, 2),
('Shoes', 'shoes', 'Footwear for all genders', 2, TRUE, 3),
('Accessories', 'accessories', 'Fashion accessories', 2, TRUE, 4);

-- ============================================
-- INSERT PRODUCTS (Many products)
-- ============================================
INSERT INTO products (name, slug, description, short_description, sku, price, sale_price, category_id, seller_id, stock_quantity, brand, status, is_featured, rating_average, rating_count, sold_count, view_count) VALUES

-- Electronics Products
('iPhone 15 Pro Max 256GB', 'iphone-15-pro-max-256gb', 'Latest iPhone with advanced Pro camera system, Action button, and titanium design. Features A17 Pro chip for incredible performance.', 'iPhone 15 Pro Max with 256GB storage and titanium design', 'IPH15PM256', 29999000, 27999000, 9, 2, 50, 'Apple', 'active', TRUE, 4.8, 125, 89, 1250),

('MacBook Air M2 13-inch', 'macbook-air-m2-13inch', 'Supercharged by M2 chip. Up to 20 hours of battery life. Liquid Retina display. Advanced camera and audio.', 'MacBook Air with M2 chip, perfect for productivity', 'MBA13M2', 25999000, 24499000, 10, 2, 30, 'Apple', 'active', TRUE, 4.9, 98, 67, 890),

('Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Galaxy AI is here. Circle to Search, Live Translate, Note Assist and more. The most epic camera on Galaxy.', 'Samsung flagship with AI features and S Pen', 'SGS24U', 26999000, NULL, 9, 2, 75, 'Samsung', 'active', TRUE, 4.7, 156, 112, 1580),

('Sony WH-1000XM5 Headphones', 'sony-wh1000xm5-headphones', 'Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life.', 'Premium noise-canceling wireless headphones', 'SONYWH1000XM5', 7999000, 6999000, 11, 2, 40, 'Sony', 'active', TRUE, 4.6, 201, 145, 967),

('Apple Watch Series 9', 'apple-watch-series-9', 'Most advanced Apple Watch yet. Featuring the new S9 SiP and Double Tap gesture.', 'Latest Apple Watch with advanced health features', 'AWSERIES9', 8999000, NULL, 12, 2, 60, 'Apple', 'active', FALSE, 4.8, 89, 56, 678),

('Dell XPS 13 Laptop', 'dell-xps-13-laptop', 'Premium ultrabook with InfinityEdge display and powerful performance in a compact design.', 'Ultra-portable laptop for professionals', 'DELLXPS13', 22999000, 21499000, 10, 2, 25, 'Dell', 'active', FALSE, 4.5, 67, 34, 456),

('iPad Pro 12.9-inch M2', 'ipad-pro-129-m2', 'The most advanced iPad Pro ever. Featuring M2 chip, Liquid Retina XDR display, and Apple Pencil support.', 'Professional tablet for creative work', 'IPADPRO129M2', 23999000, NULL, 9, 2, 35, 'Apple', 'active', TRUE, 4.9, 78, 45, 589),

-- Fashion Products  
('Nike Air Force 1 07', 'nike-air-force-1-07', 'The radiance lives on in the Nike Air Force 1 07, the basketball original that puts a fresh spin on what you know best.', 'Classic white sneakers for everyday wear', 'NIKEAF107', 2299000, NULL, 15, 3, 100, 'Nike', 'active', TRUE, 4.4, 234, 189, 1456),

('Adidas Ultraboost 23', 'adidas-ultraboost-23', 'Made with a series of recycled materials, this upper features at least 50% recycled content.', 'Comfortable running shoes with Boost technology', 'ADIUB23', 4599000, 3999000, 15, 3, 80, 'Adidas', 'active', FALSE, 4.6, 167, 123, 987),

('Levi\'s 511 Slim Jeans', 'levis-511-slim-jeans', 'The 511 Slim is cut close to the body with a slim leg. Made with our innovative Levi\'s Flex technology.', 'Slim fit jeans with stretch comfort', 'LEVI511SLIM', 1599000, 1299000, 13, 3, 150, 'Levi\'s', 'active', FALSE, 4.3, 145, 98, 678),

('Uniqlo Heattech Crew Neck T-Shirt', 'uniqlo-heattech-crew-neck', 'HEATTECH provides excellent heat retention, moisture absorption, and quick-drying comfort.', 'Thermal underwear for cold weather', 'UNIQLOHT', 399000, NULL, 13, 3, 200, 'Uniqlo', 'active', FALSE, 4.2, 89, 167, 234),

('Ray-Ban Aviator Sunglasses', 'rayban-aviator-sunglasses', 'The original Ray-Ban Aviator sunglasses were designed for U.S. aviators in 1937.', 'Classic aviator sunglasses with UV protection', 'RBAVIAT', 3999000, 3599000, 16, 3, 60, 'Ray-Ban', 'active', TRUE, 4.7, 112, 78, 456),

-- Home & Living Products
('IKEA Poäng Armchair', 'ikea-poang-armchair', 'Layer-glued bent birch frame gives comfortable resilience and makes each chair unique.', 'Comfortable armchair with bent wood frame', 'IKEAPOANG', 1999000, NULL, 3, 4, 45, 'IKEA', 'active', FALSE, 4.5, 156, 89, 345),

('Dyson V15 Detect Cordless Vacuum', 'dyson-v15-detect-cordless', 'Reveals invisible dust with laser detection and scientifically proves deep clean.', 'Advanced cordless vacuum with laser technology', 'DYSONV15', 14999000, 13499000, 3, 4, 20, 'Dyson', 'active', TRUE, 4.8, 234, 145, 567),

('Philips Hue White Smart Bulb', 'philips-hue-white-smart-bulb', 'Wireless dimming. Control your lights remotely from anywhere in the world.', 'Smart LED bulb with app control', 'PHILIPSHUE', 599000, 499000, 3, 4, 100, 'Philips', 'active', FALSE, 4.4, 178, 234, 345),

-- Sports & Outdoors Products
('Yonex Arcsaber 11 Badminton Racket', 'yonex-arcsaber-11-racket', 'Developed for attacking players who want to dominate rallies with powerful smashes.', 'Professional badminton racket for advanced players', 'YONEXARC11', 3999000, NULL, 4, 5, 30, 'Yonex', 'active', TRUE, 4.9, 67, 45, 234),

('Wilson Evolution Basketball', 'wilson-evolution-basketball', 'The preferred basketball of high school and college players nationwide.', 'Premium composite basketball for indoor use', 'WILSONEVO', 1299000, 1099000, 4, 5, 50, 'Wilson', 'active', FALSE, 4.6, 89, 67, 123),

('Coleman Sundome 4-Person Tent', 'coleman-sundome-4person-tent', 'Easy setup in 10 minutes with color-coded poles and sleeves. WeatherTec system keeps you dry.', 'Family camping tent for 4 people', 'COLEMANSUN4', 2999000, 2699000, 4, 5, 25, 'Coleman', 'active', FALSE, 4.3, 145, 78, 456),

-- Books & Media Products  
('The Psychology of Money', 'psychology-of-money-book', 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.', 'Bestselling book about financial psychology', 'PSYCHMONEY', 299000, NULL, 5, 6, 200, 'Harriman House', 'active', TRUE, 4.8, 567, 345, 1234),

('Atomic Habits by James Clear', 'atomic-habits-james-clear', 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.', 'Self-help book about habit formation', 'ATOMICHAB', 349000, 299000, 5, 6, 150, 'Random House', 'active', TRUE, 4.9, 789, 456, 2345),

('Clean Code: A Handbook', 'clean-code-handbook', 'A Handbook of Agile Software Craftsmanship by Robert C. Martin.', 'Programming best practices guide', 'CLEANCODE', 599000, NULL, 5, 6, 80, 'Prentice Hall', 'active', FALSE, 4.7, 234, 123, 567);

-- ============================================
-- INSERT PRODUCT IMAGES
-- ============================================
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order) VALUES
-- iPhone 15 Pro Max images
(1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500', 'iPhone 15 Pro Max front view', TRUE, 1),
(1, 'https://images.unsplash.com/photo-1695048133108-8495ef1e9aa0?w=500', 'iPhone 15 Pro Max back view', FALSE, 2),
(1, 'https://images.unsplash.com/photo-1695048133093-7ad983bf7bb4?w=500', 'iPhone 15 Pro Max side view', FALSE, 3),

-- MacBook Air M2 images
(2, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', 'MacBook Air M2 open view', TRUE, 1),
(2, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 'MacBook Air M2 closed view', FALSE, 2),

-- Samsung Galaxy S24 Ultra images
(3, 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500', 'Samsung Galaxy S24 Ultra front', TRUE, 1),
(3, 'https://images.unsplash.com/photo-1598300042266-8888f1453cee?w=500', 'Samsung Galaxy S24 Ultra with S Pen', FALSE, 2),

-- Sony Headphones images
(4, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 'Sony WH-1000XM5 side view', TRUE, 1),
(4, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500', 'Sony WH-1000XM5 folded', FALSE, 2),

-- Apple Watch images
(5, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500', 'Apple Watch Series 9 face view', TRUE, 1),
(5, 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500', 'Apple Watch Series 9 side view', FALSE, 2),

-- Nike shoes images  
(8, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', 'Nike Air Force 1 white', TRUE, 1),
(8, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500', 'Nike Air Force 1 side view', FALSE, 2),

-- Adidas shoes images
(9, 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500', 'Adidas Ultraboost front', TRUE, 1),
(9, 'https://images.unsplash.com/photo-1552066344-2464c1135c32?w=500', 'Adidas Ultraboost side', FALSE, 2);

-- ============================================
-- INSERT SAMPLE ORDERS
-- ============================================
INSERT INTO orders (user_id, order_number, status, payment_status, payment_method, subtotal, shipping_fee, tax_amount, total_amount, shipping_first_name, shipping_last_name, shipping_phone, shipping_address, shipping_city, shipping_postal_code) VALUES
(7, 'ORD001', 'delivered', 'paid', 'credit_card', 29999000, 50000, 0, 30049000, 'Minh', 'Nguyen', '+84911111111', '123 Customer Street', 'Ho Chi Minh City', '700010'),
(8, 'ORD002', 'shipped', 'paid', 'cod', 2299000, 30000, 0, 2329000, 'Linh', 'Tran', '+84922222222', '456 Buyer Avenue', 'Ha Noi', '100010'),
(9, 'ORD003', 'processing', 'paid', 'paypal', 7999000, 0, 0, 7999000, 'Duc', 'Le', '+84933333333', '789 Shopping Street', 'Da Nang', '550010');

-- ============================================
-- INSERT ORDER ITEMS
-- ============================================
INSERT INTO order_items (order_id, product_id, product_name, product_sku, quantity, unit_price, total_price) VALUES
(1, 1, 'iPhone 15 Pro Max 256GB', 'IPH15PM256', 1, 29999000, 29999000),
(2, 8, 'Nike Air Force 1 07', 'NIKEAF107', 1, 2299000, 2299000),
(3, 4, 'Sony WH-1000XM5 Headphones', 'SONYWH1000XM5', 1, 7999000, 7999000);

-- ============================================
-- INSERT SAMPLE CART ITEMS  
-- ============================================
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(7, 2, 1),
(7, 9, 2),
(8, 3, 1),
(9, 5, 1),
(10, 8, 3);

-- ============================================
-- INSERT PRODUCT REVIEWS
-- ============================================
INSERT INTO product_reviews (product_id, user_id, order_id, rating, review_title, review_text, is_verified_purchase, status) VALUES
(1, 7, 1, 5, 'Amazing phone!', 'The iPhone 15 Pro Max exceeded my expectations. Camera quality is incredible and the titanium build feels premium.', TRUE, 'approved'),
(8, 8, 2, 4, 'Classic and comfortable', 'Great shoes for daily wear. Comfortable and goes with everything. Only complaint is they get dirty easily.', TRUE, 'approved'),
(4, 9, 3, 5, 'Best noise canceling', 'Absolutely love these headphones. Noise canceling is top-notch and battery life is excellent.', TRUE, 'approved'),
(2, 10, NULL, 5, 'Perfect for work', 'MacBook Air M2 is perfect for my daily tasks. Fast, lightweight and great battery life.', FALSE, 'approved'),
(3, 11, NULL, 4, 'Great phone but expensive', 'Samsung Galaxy S24 Ultra has amazing features, especially the S Pen. A bit pricey but worth it.', FALSE, 'approved');