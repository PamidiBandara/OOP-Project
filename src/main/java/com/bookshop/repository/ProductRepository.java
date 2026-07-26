package com.bookshop.repository;

import com.bookshop.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Product Repository
 */
@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    Optional<Product> findBySkuAndActive(String sku, boolean active);

    List<Product> findByCategoryAndActive(String category, boolean active);

    List<Product> findByAuthorAndActive(String author, boolean active);

    Page<Product> findByActiveOrderByCreatedAtDesc(boolean active, Pageable pageable);

    Page<Product> findByCategoryAndActiveOrderByCreatedAtDesc(String category, boolean active, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCaseAndActive(String name, boolean active, Pageable pageable);

    List<Product> findByFeaturedAndActive(boolean featured, boolean active);

    List<Product> findByStockLessThan(Integer minStock);

    long countByActive(boolean active);
}
