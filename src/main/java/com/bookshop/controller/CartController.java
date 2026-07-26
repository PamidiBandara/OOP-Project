package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.CartDTO;
import com.bookshop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
@PreAuthorize("hasRole('CUSTOMER')")
@RequiredArgsConstructor
public class CartController {
  private final CartService cartService;

  @GetMapping
  public ResponseEntity<ApiResponse<CartDTO>> getCart(Authentication authentication) {
    String userId = authentication.getName();
    CartDTO cart = cartService.getCart(userId);
    return ResponseEntity.ok(ApiResponse.success("Cart retrieved successfully", cart));
  }

  @PostMapping("/items")
  public ResponseEntity<ApiResponse<CartDTO>> addToCart(
      Authentication authentication,
      @RequestParam String productId,
      @RequestParam(defaultValue = "1") int quantity) {
    String userId = authentication.getName();
    CartDTO cart = cartService.addToCart(userId, productId, quantity);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.success("Item added to cart", cart));
  }

  @DeleteMapping("/items/{productId}")
  public ResponseEntity<ApiResponse<CartDTO>> removeFromCart(
      Authentication authentication,
      @PathVariable String productId) {
    String userId = authentication.getName();
    CartDTO cart = cartService.removeFromCart(userId, productId);
    return ResponseEntity.ok(ApiResponse.success("Item removed from cart", cart));
  }

  @PutMapping("/items/{productId}")
  public ResponseEntity<ApiResponse<CartDTO>> updateCartItemQuantity(
      Authentication authentication,
      @PathVariable String productId,
      @RequestParam int quantity) {
    String userId = authentication.getName();
    CartDTO cart = cartService.updateCartItemQuantity(userId, productId, quantity);
    return ResponseEntity.ok(ApiResponse.success("Cart updated successfully", cart));
  }

  @DeleteMapping
  public ResponseEntity<ApiResponse<CartDTO>> clearCart(Authentication authentication) {
    String userId = authentication.getName();
    CartDTO cart = cartService.clearCart(userId);
    return ResponseEntity.ok(ApiResponse.success("Cart cleared successfully", cart));
  }

  @PostMapping("/coupon/{couponCode}")
  public ResponseEntity<ApiResponse<CartDTO>> applyCoupon(
      Authentication authentication,
      @PathVariable String couponCode) {
    String userId = authentication.getName();
    CartDTO cart = cartService.applyCoupon(userId, couponCode);
    return ResponseEntity.ok(ApiResponse.success("Coupon applied successfully", cart));
  }

  @DeleteMapping("/coupon")
  public ResponseEntity<ApiResponse<CartDTO>> removeCoupon(Authentication authentication) {
    String userId = authentication.getName();
    CartDTO cart = cartService.removeCoupon(userId);
    return ResponseEntity.ok(ApiResponse.success("Coupon removed successfully", cart));
  }

  @GetMapping("/count")
  public ResponseEntity<ApiResponse<Long>> getTotalCartItems(Authentication authentication) {
    String userId = authentication.getName();
    long count = cartService.getTotalCartItems(userId);
    return ResponseEntity.ok(ApiResponse.success("Cart count retrieved", count));
  }
}
