package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Order Entity
 */
@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private String id;

    private String userId;
    private String orderNumber;
    private String status; // PENDING, CONFIRMED, PACKED, SHIPPED, DELIVERED, CANCELLED

    private List<OrderItem> items;
    private Double subtotal;
    private Double shippingCost;
    private Double tax;
    private Double discount;
    private Double totalAmount;

    private String paymentMethod; // CASH_ON_DELIVERY, BANK_TRANSFER
    private String paymentStatus; // PENDING, COMPLETED, FAILED
    private String paymentId;
    private String paymentSlipUrl;

    private String shippingAddress;
    private String billingAddress;

    private OrderTracking tracking;

    private String notes;
    private boolean cancellable;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deliveredAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem {
        private String productId;
        private String productName;
        private Integer quantity;
        private Double price;
        private Double subtotal;
        private String image;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderTracking {
        private LocalDateTime pendingAt;
        private LocalDateTime confirmedAt;
        private LocalDateTime packedAt;
        private LocalDateTime shippedAt;
        private LocalDateTime deliveredAt;
        private String trackingNumber;
        private String carrier;
    }
}
