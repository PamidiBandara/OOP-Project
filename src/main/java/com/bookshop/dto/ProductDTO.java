package com.bookshop.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Product DTO for API responses
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private String id;
    private String name;
    private String type;
    private String description;
    private String sku;
    private String isbn;

    private Double price;
    private Double discountPrice;
    private Double discountPercentage;
    private Integer stock;

    private List<String> images;
    private String mainImage;

    private String category;
    private String author;
    private String publisher;
    private String brand;
    private String supplier;

    private Integer pages;
    private String language;
    private String edition;
    private LocalDateTime publicationDate;

    private Double averageRating;
    private Integer reviewCount;
    private Integer soldCount;

    private boolean active;
    private boolean featured;
    private LocalDateTime createdAt;
}
