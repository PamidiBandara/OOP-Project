package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.WishlistDTO;
import com.bookshop.entity.Wishlist;
import com.bookshop.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin("*")
@PreAuthorize("hasRole('CUSTOMER')")
@RequiredArgsConstructor
public class WishlistController {
  private final WishlistService wishlistService;

  @GetMapping
  public ResponseEntity<ApiResponse<WishlistDTO>> getWishlist(Authentication authentication) {
    String userId = authentication.getName();
    WishlistDTO wishlist = wishlistService.getWishlist(userId);
    return ResponseEntity.ok(ApiResponse.success("Wishlist retrieved successfully", wishlist));
  }

  @PostMapping("/items/{productId}")
  public ResponseEntity<ApiResponse<Void>> addToWishlist(
      Authentication authentication,
      @PathVariable String productId) {
    String userId = authentication.getName();
    wishlistService.addToWishlist(userId, productId);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.success("Item added to wishlist", null));
  }

  @DeleteMapping("/items/{productId}")
  public ResponseEntity<ApiResponse<Void>> removeFromWishlist(
      Authentication authentication,
      @PathVariable String productId) {
    String userId = authentication.getName();
    wishlistService.removeFromWishlist(userId, productId);
    return ResponseEntity.ok(ApiResponse.success("Item removed from wishlist", null));
  }

  @GetMapping("/items/{productId}")
  public ResponseEntity<ApiResponse<Boolean>> isInWishlist(
      Authentication authentication,
      @PathVariable String productId) {
    String userId = authentication.getName();
    boolean isInWishlist = wishlistService.isInWishlist(userId, productId);
    return ResponseEntity.ok(ApiResponse.success("Wishlist status retrieved", isInWishlist));
  }

  @DeleteMapping
  public ResponseEntity<ApiResponse<Void>> clearWishlist(Authentication authentication) {
    String userId = authentication.getName();
    wishlistService.clearWishlist(userId);
    return ResponseEntity.ok(ApiResponse.success("Wishlist cleared successfully", null));
  }

  @GetMapping("/count")
  public ResponseEntity<ApiResponse<Long>> getWishlistCount(Authentication authentication) {
    String userId = authentication.getName();
    long count = wishlistService.getWishlistCount(userId);
    return ResponseEntity.ok(ApiResponse.success("Wishlist count retrieved", count));
  }
}
