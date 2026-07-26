package com.bookshop.repository;

import com.bookshop.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Review Repository
 */
@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByProductIdAndActive(String productId, boolean active);

    Page<Review> findByProductIdAndActiveOrderByCreatedAtDesc(String productId, boolean active, Pageable pageable);

    Page<Review> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);

    long countByProductIdAndActive(String productId, boolean active);
}
