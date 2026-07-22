package com.smartbookshop.smart_bookshop.repository;

import com.smartbookshop.smart_bookshop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {

}