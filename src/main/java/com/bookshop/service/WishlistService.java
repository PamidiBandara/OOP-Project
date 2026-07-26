package com.bookshop.service;

import com.bookshop.dto.WishlistDTO;
import com.bookshop.entity.Wishlist;
import org.springframework.data.domain.Pageable;

/**
 * Wishlist Service Interface
 * 
 * OOP CONCEPT: ABSTRACTION
 * This interface hides the complex implementation details of how a wishlist
 * operates.
 * Other components (like the WishlistController) interact with this interface
 * without
 * needing to know the underlying database logic or how these methods are
 * actually executed.
 */
public interface WishlistService {

    void addToWishlist(String userId, String productId);

    void removeFromWishlist(String userId, String productId);

    boolean isInWishlist(String userId, String productId);

    WishlistDTO getWishlist(String userId);

    void clearWishlist(String userId);

    long getWishlistCount(String userId);
}
