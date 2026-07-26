package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Author Entity
 */
@Document(collection = "authors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Author {

    @Id
    private String id;

    private String name;
    private String biography;
    private String image;
    private String country;
    private LocalDateTime dateOfBirth;
    private String email;
    private String website;
    private Integer totalBooks;

    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
