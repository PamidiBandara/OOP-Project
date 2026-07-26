package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Notification Entity
 */
@Document(collection = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    private String id;

    private String userId;
    private String title;
    private String message;
    private String type; // ORDER_STATUS, BACK_IN_STOCK, OFFER, ANNOUNCEMENT
    private String relatedId; // Order ID, Product ID, etc.

    private boolean read;
    private LocalDateTime readAt;

    private LocalDateTime createdAt;
}
