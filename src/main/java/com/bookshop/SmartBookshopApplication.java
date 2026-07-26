package com.bookshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main Spring Boot Application Entry Point
 * Smart Online Bookshop & Stationery Management System
 */
@SpringBootApplication
@ComponentScan("com.bookshop")
public class SmartBookshopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartBookshopApplication.class, args);
    }
}
