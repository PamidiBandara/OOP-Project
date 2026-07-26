package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Brand Entity
 */
@Document(collection = "brands")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand {

    @Id
    private String id;

    private String name;
    private String description;
    private String logo;
    private String website;
    private Integer totalProducts;

    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
