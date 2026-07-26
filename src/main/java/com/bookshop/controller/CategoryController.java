package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.CategoryDTO;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CategoryController {
  private final CategoryService categoryService;

  @GetMapping
  public ResponseEntity<ApiResponse<List<CategoryDTO>>> getAllActiveCategories() {
    List<CategoryDTO> categories = categoryService.getAllActiveCategories();
    return ResponseEntity.ok(ApiResponse.success("Categories retrieved successfully", categories));
  }

  @GetMapping("/paginated")
  public ResponseEntity<ApiResponse<PaginationResponse<CategoryDTO>>> getPaginatedCategories(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "12") int size) {
    Pageable pageable = PageRequest.of(page, size);
    PaginationResponse<CategoryDTO> categories = categoryService.getAllCategories(pageable);
    return ResponseEntity.ok(ApiResponse.success("Categories retrieved successfully", categories));
  }

  @GetMapping("/{categoryId}")
  public ResponseEntity<ApiResponse<CategoryDTO>> getCategory(
      @PathVariable String categoryId) {
    CategoryDTO category = categoryService.getCategory(categoryId);
    return ResponseEntity.ok(ApiResponse.success("Category retrieved successfully", category));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<CategoryDTO>> createCategory(
      @RequestBody CategoryDTO categoryDTO) {
    CategoryDTO category = categoryService.createCategory(categoryDTO);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.success("Category created successfully", category));
  }

  @PutMapping("/{categoryId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<CategoryDTO>> updateCategory(
      @PathVariable String categoryId,
      @RequestBody CategoryDTO categoryDTO) {
    CategoryDTO category = categoryService.updateCategory(categoryId, categoryDTO);
    return ResponseEntity.ok(ApiResponse.success("Category updated successfully", category));
  }

  @DeleteMapping("/{categoryId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<Void>> deleteCategory(
      @PathVariable String categoryId) {
    categoryService.deleteCategory(categoryId);
    return ResponseEntity.ok(ApiResponse.success("Category deleted successfully", null));
  }
}
