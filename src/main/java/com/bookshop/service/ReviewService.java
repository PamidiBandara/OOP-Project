package com.bookshop.service;

import com.bookshop.dto.CreateReviewRequest;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.dto.ReviewDTO;
import org.springframework.data.domain.Pageable;

/**
 * Review Service Interface
 */
public interface ReviewService {

    ReviewDTO createReview(String productId, String userId, String userName, String userAvatar, int rating,
            String title, String comment);

    ReviewDTO updateReview(String reviewId, int rating, String title, String comment);

    void deleteReview(String reviewId);

    PaginationResponse<ReviewDTO> getProductReviews(String productId, Pageable pageable);

    PaginationResponse<ReviewDTO> getUserReviews(String userId, Pageable pageable);

    ReviewDTO getReview(String reviewId);

    double calculateAverageRating(String productId);

    long getReviewCount(String productId);
}
