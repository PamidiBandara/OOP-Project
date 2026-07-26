package com.bookshop.repository;

import com.bookshop.entity.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Supplier Repository
 */
@Repository
public interface SupplierRepository extends MongoRepository<Supplier, String> {

    List<Supplier> findByActive(boolean active);

    Page<Supplier> findByActiveOrderByNameAsc(boolean active, Pageable pageable);

    boolean existsByNameAndActive(String name, boolean active);
}
