package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.ReviewDTO;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ReviewController {
  private final ReviewService reviewService;

  @GetMapping("/product/{productId}")
  public ResponseEntity<ApiResponse<PaginationResponse<ReviewDTO>>> getProductReviews(
      @PathVariable String productId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "5") int size) {
    Pageable pageable = PageRequest.of(page, size);
    PaginationResponse<ReviewDTO> reviews = reviewService.getProductReviews(productId, pageable);
    return ResponseEntity.ok(ApiResponse.success("Reviews retrieved successfully", reviews));
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<PaginationResponse<ReviewDTO>>> getUserReviews(
      Authentication authentication,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    String userId = authentication.getName();
    Pageable pageable = PageRequest.of(page, size);
    PaginationResponse<ReviewDTO> reviews = reviewService.getUserReviews(userId, pageable);
    return ResponseEntity.ok(ApiResponse.success("User reviews retrieved successfully", reviews));
  }

  @GetMapping("/{reviewId}")
  public ResponseEntity<ApiResponse<ReviewDTO>> getReview(
      @PathVariable String reviewId) {
    ReviewDTO review = reviewService.getReview(reviewId);
    return ResponseEntity.ok(ApiResponse.success("Review retrieved successfully", review));
  }

  @PostMapping
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<ReviewDTO>> createReview(
      Authentication authentication,
      @RequestParam String productId,
      @RequestParam int rating,
      @RequestParam String title,
      @RequestParam String comment,
      @RequestParam(required = false) String userName,
      @RequestParam(required = false) String userAvatar) {
    String userId = authentication.getName();
    ReviewDTO review = reviewService.createReview(productId, userId, userName, userAvatar, rating, title, comment);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.success("Review created successfully", review));
  }

  @PutMapping("/{reviewId}")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<ReviewDTO>> updateReview(
      @PathVariable String reviewId,
      @RequestParam int rating,
      @RequestParam String title,
      @RequestParam String comment) {
    ReviewDTO review = reviewService.updateReview(reviewId, rating, title, comment);
    return ResponseEntity.ok(ApiResponse.success("Review updated successfully", review));
  }

  @DeleteMapping("/{reviewId}")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<Void>> deleteReview(
      @PathVariable String reviewId) {
    reviewService.deleteReview(reviewId);
    return ResponseEntity.ok(ApiResponse.success("Review deleted successfully", null));
  }

  @GetMapping("/product/{productId}/rating")
  public ResponseEntity<ApiResponse<Double>> getAverageRating(
      @PathVariable String productId) {
    double avgRating = reviewService.calculateAverageRating(productId);
    return ResponseEntity.ok(ApiResponse.success("Average rating retrieved", avgRating));
  }

  @GetMapping("/product/{productId}/count")
  public ResponseEntity<ApiResponse<Long>> getReviewCount(
      @PathVariable String productId) {
    long count = reviewService.getReviewCount(productId);
    return ResponseEntity.ok(ApiResponse.success("Review count retrieved", count));
  }
}
