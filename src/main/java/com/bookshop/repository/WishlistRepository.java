package com.bookshop.repository;

import com.bookshop.entity.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Wishlist Repository
 */
@Repository
public interface WishlistRepository extends MongoRepository<Wishlist, String> {

    Optional<Wishlist> findByUserId(String userId);
}
