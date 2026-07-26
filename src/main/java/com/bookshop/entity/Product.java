package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Product Entity - Books and Stationery
 */
@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    private String id;

    private String name;
    private String type; // e.g., Book, Stationary, Study Pack
    private String description;
    private String sku;
    private String isbn; // For books
    private String category; // Category ID
    private List<String> subcategories;

    private Double price;
    private Double discountPrice;
    private Double discountPercentage;
    private Integer stock;
    private Integer minStock;

    private List<String> images; // Image URLs from Cloudinary
    private String mainImage;

    private String author; // Author ID
    private String publisher; // Publisher ID
    private String brand; // Brand ID
    private String supplier; // Supplier ID

    private Integer pages;
    private String language;
    private String edition;
    private String condition;
    private LocalDateTime publicationDate;

    private Double averageRating;
    private Integer reviewCount;
    private List<String> reviews; // Review IDs

    private Integer soldCount;
    private boolean active;
    private boolean featured;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
