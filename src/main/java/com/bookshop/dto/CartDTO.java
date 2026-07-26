package com.bookshop.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Cart DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {

    private String id;
    private String userId;
    private List<CartItemDTO> items;
    private Double subtotal;
    private Double shippingCost;
    private Double totalAmount;
    private String couponCode;
    private Double discountAmount;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CartItemDTO {
        private String productId;
        private String productName;
        private Integer quantity;
        private Double price;
        private Double subtotal;
        private String image;
        private Integer stock;
    }
}
