package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Wishlist Entity
 */
@Document(collection = "wishlist")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wishlist {

    @Id
    private String id;

    private String userId;
    private List<String> productIds;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
