package com.bookshop.repository;

import com.bookshop.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Category Repository
 */
@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    Optional<Category> findBySlug(String slug);

    List<Category> findByActiveOrderByDisplayOrder(boolean active);

    boolean existsByNameAndActive(String name, boolean active);
}
