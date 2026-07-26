package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * RecentlyViewed Entity
 */
@Document(collection = "recentlyViewed")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentlyViewed {

    @Id
    private String id;

    private String userId;
    private List<ViewedProduct> products;

    private LocalDateTime lastUpdated;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ViewedProduct {
        private String productId;
        private LocalDateTime viewedAt;
    }
}
