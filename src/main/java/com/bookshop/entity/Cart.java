package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Cart Entity
 */
@Document(collection = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    private String id;

    private String userId;
    private List<CartItem> items;
    private Double subtotal;
    private Double shippingCost;
    private Double totalAmount;
    private String couponCode;
    private Double discountAmount;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CartItem {
        private String productId;
        private String productName;
        private Integer quantity;
        private Double price;
        private Double subtotal;
        private String image;
        private Integer stock;
    }
}
