package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Publisher Entity
 */
@Document(collection = "publishers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Publisher {

    @Id
    private String id;

    private String name;
    private String description;
    private String logo;
    private String country;
    private String email;
    private String website;
    private Integer totalBooks;

    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
