package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * DeliveryAddress Entity
 */
@Document(collection = "deliveryAddresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryAddress {

    @Id
    private String id;

    private String userId;
    private String name;
    private String phone;
    private String email;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String addressType; // HOME, OFFICE, OTHER

    private boolean isDefault;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
