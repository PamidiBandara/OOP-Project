package com.bookshop.repository;

import com.bookshop.entity.Author;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Author Repository
 */
@Repository
public interface AuthorRepository extends MongoRepository<Author, String> {

    Optional<Author> findByNameAndActive(String name, boolean active);

    List<Author> findByActive(boolean active);

    Page<Author> findByActiveOrderByNameAsc(boolean active, Pageable pageable);

    boolean existsByNameAndActive(String name, boolean active);
}
