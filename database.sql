CREATE DATABASE IF NOT EXISTS hat_xoan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hat_xoan;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,full_name VARCHAR(100) NOT NULL,email VARCHAR(150) UNIQUE NOT NULL,password_hash VARCHAR(255) NOT NULL,role ENUM('user','admin') DEFAULT 'user',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE tour_registrations (id INT AUTO_INCREMENT PRIMARY KEY,full_name VARCHAR(100) NOT NULL,phone VARCHAR(20) NOT NULL,experience_date DATE NOT NULL,people_count INT NOT NULL,discount_code VARCHAR(50),note TEXT,status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
