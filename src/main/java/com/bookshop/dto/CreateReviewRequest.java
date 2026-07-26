package com.bookshop.dto;

import lombok.*;
import jakarta.validation.constraints.*;

/**
 * Create Review Request DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateReviewRequest {

    @NotBlank(message = "Product ID is required")
    private String productId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Integer rating;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Comment is required")
    @Size(min = 10, message = "Comment must be at least 10 characters")
    private String comment;
}
