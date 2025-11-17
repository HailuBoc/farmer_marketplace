-- ===========================================================
--  DATABASE: farmers_marketplace
--  Description: Base schema for Local Farmers Marketplace
-- ===========================================================
-- Drop existing tables (to reset schema)
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS farmers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
-- ===========================================================
--  USERS TABLE
-- ===========================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('admin', 'farmer', 'customer')),
    created_at TIMESTAMP DEFAULT NOW()
);
-- ===========================================================
--  FARMERS TABLE
-- ===========================================================
CREATE TABLE farmers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    contact_number VARCHAR(20),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
-- ===========================================================
--  PRODUCTS TABLE
-- ===========================================================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES farmers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    image TEXT DEFAULT NULL,
    -- ✅ image column exists
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
-- ===========================================================
--  ORDERS TABLE 
-- ===========================================================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE farmers_application (
    id SERIAL PRIMARY KEY,
    businessname TEXT,
    owner_name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    products TEXT,
    bank_details TEXT,
    website TEXT,
    photo TEXT
);
-- ===========================================================
--  SEED DATA
-- ===========================================================
-- Admin
INSERT INTO users (name, email, password, role)
VALUES (
        'Admin User',
        'admin@marketplace.com',
        'admin123',
        'admin'
    );
-- Farmers
INSERT INTO users (name, email, password, role)
VALUES (
        'John Doe',
        'john@farm.com',
        'johnpass',
        'farmer'
    ),
    (
        'Mary Green',
        'mary@farm.com',
        'marypass',
        'farmer'
    );
-- Farmer details
INSERT INTO farmers (
        user_id,
        farm_name,
        location,
        contact_number,
        verified
    )
VALUES (
        2,
        'Sunrise Farm',
        'Addis Ababa',
        '0911223344',
        TRUE
    ),
    (
        3,
        'Green Valley',
        'Bahir Dar',
        '0922334455',
        TRUE
    );
-- Products
INSERT INTO products (
        farmer_id,
        name,
        category,
        description,
        price,
        stock,
        image,
        approved
    )
VALUES (
        1,
        'Organic Tomatoes',
        'Vegetables',
        'Fresh organic tomatoes from Sunrise Farm',
        2.99,
        120,
        'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
        TRUE
    ),
    (
        1,
        'Avocado',
        'Fruits',
        'Creamy avocados picked daily',
        3.50,
        80,
        'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a',
        TRUE
    ),
    (
        2,
        'Honey',
        'Honey & Bees',
        'Pure natural honey from Green Valley',
        5.75,
        60,
        'https://images.unsplash.com/photo-1514996937319-344454492b37',
        FALSE
    );
-- Orders
INSERT INTO orders (
        user_id,
        product_id,
        quantity,
        total_price,
        status
    )
VALUES (1, 1, 2, 5.98, 'completed');
-- ===========================================================
--  INDEXES
-- ===========================================================
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_farmers_verified ON farmers(verified);
-- ===========================================================
--  VIEWS
-- ===========================================================
CREATE OR REPLACE VIEW approved_products AS
SELECT *
FROM products
WHERE approved = TRUE;
CREATE OR REPLACE VIEW farmer_products AS
SELECT f.farm_name,
    p.name AS product_name,
    p.category,
    p.price,
    p.stock,
    p.image,
    p.approved
FROM farmers f
    JOIN products p ON f.id = p.farmer_id;