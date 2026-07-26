package com.bookshop.repository;

import com.bookshop.entity.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Offer Repository
 */
@Repository
public interface OfferRepository extends MongoRepository<Offer, String> {

    Optional<Offer> findByCodeAndActive(String code, boolean active);

    List<Offer> findByActive(boolean active);

    Page<Offer> findByActiveOrderByCreatedAtDesc(boolean active, Pageable pageable);
}
