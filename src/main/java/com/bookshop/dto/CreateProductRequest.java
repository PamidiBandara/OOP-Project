package com.bookshop.dto;

import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Create/Update Product Request DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    private String type;

    private String description;

    private String sku;

    private String isbn;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    private Double discountPrice;
    private Double discountPercentage;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    @Min(value = 0, message = "Minimum stock cannot be negative")
    private Integer minStock;

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

    private boolean active;
    private boolean featured;
}
