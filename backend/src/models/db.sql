-- SQL CODE --

-- 1. Create Database --
CREATE DATABASE e_commerce
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- 2. Enable UUID extension (for table ids) --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Create Type Enum for users role --
CREATE TYPE users_role_type AS ENUM ('admin', 'customer');

-- 4. Create Type Enum for products category --
CREATE TYPE products_category_type AS ENUM ('electronics', 'clothing', 'accessories');

-- 5. Create users table --
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT CHECK (char_length(password) >= 6) NOT NULL,
    role users_role_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_signed_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. Create products table --
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC CHECK (price >= 0) NOT NULL,
    image TEXT NOT NULL,
    category products_category_type NOT NULL,
    is_featured BOOLEAN DEFAULT False NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 7. Create cart products table --
CREATE TABLE cart_products (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    quantity INT DEFAULT 1 CHECK (quantity >= 1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, product_id)
);

-- 8. Create coupons table --
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    code TEXT UNIQUE NOT NULL,
    discount_percentage INT CHECK (discount_percentage BETWEEN 0 AND 100) NOT NULL,
    expiration_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 9. Create orders table --
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    total_amount NUMERIC CHECK (total_amount >= 0) NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 10. Create order_products table --
CREATE TABLE order_products (
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    quantity INT CHECK (quantity >= 1) NOT NULL,
    price NUMERIC CHECK (price >= 0) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

-- Create users --
INSERT INTO users (name, email, password, role)
VALUES ('Luis Valencia', 'lvluisvalencialv@gmail.com', 'password', 'admin'),
('John Doe', 'johndoe@gmail.com', 'password', 'customer');

-- Select users --
SELECT * FROM users;

-- Create products --
INSERT INTO products (name, description, price, image, category)
VALUES ('Gucci Flip Flops', 'Premium Gucci Flip Flops are made for luxurious people.', 299.99, 'https://www.image.com', 'accessories'),
('T Shirt', 'Just your regular T Shirt for everyday use.', 19.99, 'https://www.image.com', 'clothing');

-- Select products --
SELECT * FROM products;

-- Create cart products --
INSERT INTO cart_products (user_id, product_id, quantity)
VALUES ('64e94a71-c36f-4c5d-895d-b9a95874e7fb', 'd8f392cc-1b60-48a7-89de-15db4696d9cb', 1),
('64e94a71-c36f-4c5d-895d-b9a95874e7fb', '4a4594a4-7f94-403e-8e85-2ec820a9ab17', 5);

-- Select cart products --
SELECT * FROM cart_products;
