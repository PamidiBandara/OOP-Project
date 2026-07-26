package com.bookshop.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Announcement Entity
 */
@Document(collection = "announcements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement {

    @Id
    private String id;

    private String title;
    private String content;
    private String image;
    private String type; // NEWS, MAINTENANCE, OFFER, UPDATE

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean active;
    private Integer priority;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
