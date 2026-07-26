package com.bookshop.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Order DTO for API responses
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private String id;
    private String orderNumber;
    private String status;
    private List<OrderItemDTO> items;
    private Double subtotal;
    private Double shippingCost;
    private Double tax;
    private Double discount;
    private Double totalAmount;

    private String paymentMethod;
    private String paymentStatus;
    private String paymentId;
    private String paymentSlipUrl;

    private String shippingAddress;
    private String billingAddress;

    private OrderTrackingDTO tracking;
    private String notes;
    private boolean cancellable;

    private LocalDateTime createdAt;
    private LocalDateTime deliveredAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDTO {
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
    @Builder
    public static class OrderTrackingDTO {
        private String status;
        private LocalDateTime pendingAt;
        private LocalDateTime confirmedAt;
        private LocalDateTime packedAt;
        private LocalDateTime shippedAt;
        private LocalDateTime deliveredAt;
        private String trackingNumber;
        private String carrier;
    }
}
