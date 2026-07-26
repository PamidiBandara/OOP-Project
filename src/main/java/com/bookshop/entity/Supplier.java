package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Supplier Entity
 */
@Document(collection = "suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Supplier {

    @Id
    private String id;

    private String name;
    private String description;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String country;
    private String contactPerson;
    private Integer totalProducts;

    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
