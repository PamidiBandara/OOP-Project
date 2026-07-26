package com.bookshop.repository;

import com.bookshop.entity.Publisher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Publisher Repository
 */
@Repository
public interface PublisherRepository extends MongoRepository<Publisher, String> {

    List<Publisher> findByActive(boolean active);

    Page<Publisher> findByActiveOrderByNameAsc(boolean active, Pageable pageable);

    boolean existsByNameAndActive(String name, boolean active);
}
