package com.bookshop.repository;

import com.bookshop.entity.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Announcement Repository
 */
@Repository
public interface AnnouncementRepository extends MongoRepository<Announcement, String> {

    List<Announcement> findByActiveOrderByPriorityDesc(boolean active);

    Page<Announcement> findByActiveOrderByCreatedAtDesc(boolean active, Pageable pageable);
}
