package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * StudyKit Entity - Bundle of products for specific purposes
 */
@Document(collection = "studykits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyKit {

    @Id
    private String id;

    private String name;
    private String description;
    private String image;
    private String category; // e.g., "Class 10 Science Kit", "IELTS Preparation Kit"

    private List<String> productIds; // Product IDs in the kit
    private List<KitProduct> products; // Product details

    private Double regularPrice; // Sum of individual prices
    private Double bundlePrice; // Discounted price
    private Double discountPercentage;

    private String targetAudience; // e.g., "Students", "Professionals"
    private String gradeLevel; // e.g., "Class 10", "University"

    private Integer stock;
    private Integer soldCount;
    private Double averageRating;
    private Integer reviewCount;

    private boolean active;
    private boolean featured;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class KitProduct {
        private String productId;
        private String productName;
        private Double price;
        private String image;
    }
}
