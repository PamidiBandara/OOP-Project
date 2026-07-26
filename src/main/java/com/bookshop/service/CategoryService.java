package com.bookshop.service;

import com.bookshop.dto.CategoryDTO;
import com.bookshop.dto.PaginationResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Category Service Interface
 */
public interface CategoryService {

    CategoryDTO createCategory(CategoryDTO request);

    CategoryDTO updateCategory(String id, CategoryDTO request);

    void deleteCategory(String id);

    CategoryDTO getCategory(String id);

    List<CategoryDTO> getAllActiveCategories();

    PaginationResponse<CategoryDTO> getAllCategories(Pageable pageable);
}
