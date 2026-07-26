package com.bookshop.dto;

import lombok.*;
import java.time.LocalDateTime;

/**
 * Review DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {

    private String id;
    private String productId;
    private String userId;
    private String userName;
    private String userAvatar;
    private Integer rating;
    private String title;
    private String comment;
    private boolean verifiedPurchase;
    private Integer helpfulCount;
    private Integer unhelpfulCount;
    private LocalDateTime createdAt;
}
