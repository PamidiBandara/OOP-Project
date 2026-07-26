package com.bookshop.repository;

import com.bookshop.entity.StudyKit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * StudyKit Repository
 */
@Repository
public interface StudyKitRepository extends MongoRepository<StudyKit, String> {

    List<StudyKit> findByActiveOrderByCreatedAtDesc(boolean active);

    Page<StudyKit> findByActiveOrderByCreatedAtDesc(boolean active, Pageable pageable);

    List<StudyKit> findByFeaturedAndActive(boolean featured, boolean active);

    Page<StudyKit> findByCategoryAndActiveOrderByCreatedAtDesc(String category, boolean active, Pageable pageable);
}
