package com.smartbookshop.smart_bookshop.repository;

import com.smartbookshop.smart_bookshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String email);

}