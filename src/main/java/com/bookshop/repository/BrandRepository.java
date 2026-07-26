package com.bookshop.repository;

import com.bookshop.entity.Brand;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Brand Repository
 */
@Repository
public interface BrandRepository extends MongoRepository<Brand, String> {

    List<Brand> findByActive(boolean active);

    Page<Brand> findByActiveOrderByNameAsc(boolean active, Pageable pageable);

    boolean existsByNameAndActive(String name, boolean active);
}
