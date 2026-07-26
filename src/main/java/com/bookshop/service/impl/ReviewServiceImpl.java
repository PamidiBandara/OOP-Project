package com.bookshop.service.impl;

import com.bookshop.dto.ReviewDTO;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.entity.Review;
import com.bookshop.entity.Product;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.ReviewRepository;
import com.bookshop.repository.ProductRepository;
import com.bookshop.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
  private final ReviewRepository reviewRepository;
  private final ProductRepository productRepository;

  @Override
  public ReviewDTO createReview(String productId, String userId, String userName,
      String userAvatar, int rating, String title, String comment) {
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

    Review review = new Review();
    review.setProductId(productId);
    review.setUserId(userId);
    review.setUserName(userName);
    review.setUserAvatar(userAvatar);
    review.setRating(rating);
    review.setTitle(title);
    review.setComment(comment);
    review.setVerifiedPurchase(true);
    review.setHelpfulCount(0);
    review.setUnhelpfulCount(0);
    review.setActive(true);
    review.setCreatedAt(LocalDateTime.now());
    review.setUpdatedAt(LocalDateTime.now());

    review = reviewRepository.save(review);

    // Update product rating
    updateProductRating(productId);

    return convertToDTO(review);
  }

  @Override
  public ReviewDTO updateReview(String reviewId, int rating, String title, String comment) {
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

    review.setRating(rating);
    review.setTitle(title);
    review.setComment(comment);
    review.setUpdatedAt(LocalDateTime.now());

    review = reviewRepository.save(review);

    updateProductRating(review.getProductId());

    return convertToDTO(review);
  }

  @Override
  public void deleteReview(String reviewId) {
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

    reviewRepository.deleteById(reviewId);
    updateProductRating(review.getProductId());
  }

  @Override
  public PaginationResponse<ReviewDTO> getProductReviews(String productId, Pageable pageable) {
    Page<Review> page = reviewRepository.findByProductIdAndActiveOrderByCreatedAtDesc(productId, true, pageable);
    return convertToPaginationResponse(page);
  }

  @Override
  public PaginationResponse<ReviewDTO> getUserReviews(String userId, Pageable pageable) {
    Page<Review> page = reviewRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    return convertToPaginationResponse(page);
  }

  @Override
  public ReviewDTO getReview(String reviewId) {
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
    return convertToDTO(review);
  }

  @Override
  public double calculateAverageRating(String productId) {
    List<Review> reviews = reviewRepository.findByProductIdAndActive(productId, true);
    if (reviews.isEmpty())
      return 0.0;

    return reviews.stream()
        .mapToDouble(Review::getRating)
        .average()
        .orElse(0.0);
  }

  @Override
  public long getReviewCount(String productId) {
    return reviewRepository.countByProductIdAndActive(productId, true);
  }

  private void updateProductRating(String productId) {
    Product product = productRepository.findById(productId).orElse(null);
    if (product != null) {
      product.setAverageRating(calculateAverageRating(productId));
      product.setReviewCount((int) getReviewCount(productId));
      product.setUpdatedAt(LocalDateTime.now());
      productRepository.save(product);
    }
  }

  private ReviewDTO convertToDTO(Review review) {
    return ReviewDTO.builder()
        .id(review.getId())
        .productId(review.getProductId())
        .userId(review.getUserId())
        .userName(review.getUserName())
        .userAvatar(review.getUserAvatar())
        .rating(review.getRating())
        .title(review.getTitle())
        .comment(review.getComment())
        .verifiedPurchase(review.isVerifiedPurchase())
        .helpfulCount(review.getHelpfulCount())
        .unhelpfulCount(review.getUnhelpfulCount())
        .createdAt(review.getCreatedAt())
        .build();
  }

  private PaginationResponse<ReviewDTO> convertToPaginationResponse(Page<Review> page) {
    List<ReviewDTO> content = page.getContent().stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());

    return new PaginationResponse<>(
        content,
        page.getNumber(),
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages(),
        page.hasNext(),
        page.hasPrevious(),
        page.isFirst(),
        page.isLast());
  }
}
