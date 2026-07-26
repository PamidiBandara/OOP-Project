package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Review Entity
 */
@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    private String id;

    private String productId;
    private String userId;
    private String userName;
    private String userAvatar;

    private Integer rating; // 1-5
    private String title;
    private String comment;
    private boolean verifiedPurchase;

    private Integer helpfulCount;
    private Integer unhelpfulCount;

    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
