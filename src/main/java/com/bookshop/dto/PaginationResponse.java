package com.bookshop.dto;

import lombok.*;
import java.util.List;

/**
 * Pagination Response DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaginationResponse<T> {

    private List<T> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean hasNext;
    private boolean hasPrevious;
    private boolean isFirst;
    private boolean isLast;
}
