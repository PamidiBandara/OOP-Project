package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Offer Entity
 */
@Document(collection = "offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Offer {

    @Id
    private String id;

    private String title;
    private String description;
    private String image;
    private String code;
    private Integer discountPercentage;
    private Double discountAmount;
    private Double maxDiscount;
    private Double minPurchaseAmount;

    private List<String> applicableProducts; // Product IDs
    private List<String> applicableCategories; // Category IDs

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer usageLimit;
    private Integer usedCount;

    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
