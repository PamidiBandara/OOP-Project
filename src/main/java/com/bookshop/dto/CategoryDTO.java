package com.bookshop.dto;

import lombok.*;
import java.time.LocalDateTime;

/**
 * Category DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {

    private String id;
    private String name;
    private String description;
    private String image;
    private String slug;
    private boolean active;
    private int displayOrder;
    private String parentId;
    private LocalDateTime createdAt;
}
