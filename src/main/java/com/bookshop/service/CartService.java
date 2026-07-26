package com.bookshop.service;

import com.bookshop.dto.CartDTO;

/**
 * Cart Service Interface
 */
public interface CartService {

    CartDTO getCart(String userId);

    CartDTO addToCart(String userId, String productId, int quantity);

    CartDTO removeFromCart(String userId, String productId);

    CartDTO updateCartItemQuantity(String userId, String productId, int quantity);

    CartDTO clearCart(String userId);

    CartDTO applyCoupon(String userId, String couponCode);

    CartDTO removeCoupon(String userId);

    long getTotalCartItems(String userId);
}
