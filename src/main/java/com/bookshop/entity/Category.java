package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Category Entity
 */
@Document(collection = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    private String id;

    private String name;
    private String description;
    private String image;
    private String slug;
    private boolean active;
    private int displayOrder;
    
    private String parentId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
