package com.bookshop.repository;

import com.bookshop.entity.RecentlyViewed;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * RecentlyViewed Repository
 */
@Repository
public interface RecentlyViewedRepository extends MongoRepository<RecentlyViewed, String> {

    Optional<RecentlyViewed> findByUserId(String userId);
}
