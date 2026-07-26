package com.bookshop.service.impl;

import com.bookshop.dto.CategoryDTO;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.entity.Category;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.CategoryRepository;
import com.bookshop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepository categoryRepository;

  @Override
  public CategoryDTO createCategory(CategoryDTO dto) {
    if (categoryRepository.existsByNameAndActive(dto.getName(), true)) {
      throw new IllegalArgumentException("Category already exists");
    }

    Category category = new Category();
    category.setName(dto.getName());
    category.setDescription(dto.getDescription());
    category.setImage(dto.getImage());
    category.setSlug(dto.getSlug() != null ? dto.getSlug() : dto.getName().toLowerCase().replace(" ", "-"));
    category.setActive(true);
    category.setDisplayOrder(0);
    category.setParentId(dto.getParentId());
    category.setCreatedAt(LocalDateTime.now());
    category.setUpdatedAt(LocalDateTime.now());

    category = categoryRepository.save(category);
    return convertToDTO(category);
  }

  @Override
  public CategoryDTO updateCategory(String categoryId, CategoryDTO dto) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

    if (dto.getParentId() != null && dto.getParentId().equals(categoryId)) {
      throw new IllegalArgumentException("A category cannot be its own parent");
    }

    category.setName(dto.getName());
    category.setDescription(dto.getDescription());
    category.setImage(dto.getImage());
    category.setSlug(dto.getSlug() != null ? dto.getSlug() : dto.getName().toLowerCase().replace(" ", "-"));
    category.setDisplayOrder(dto.getDisplayOrder());
    category.setActive(dto.isActive());
    category.setParentId(dto.getParentId());
    category.setUpdatedAt(LocalDateTime.now());

    category = categoryRepository.save(category);
    return convertToDTO(category);
  }

  @Override
  public void deleteCategory(String categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

    categoryRepository.deleteById(categoryId);
  }

  @Override
  public CategoryDTO getCategory(String categoryId) {
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    return convertToDTO(category);
  }

  @Override
  public List<CategoryDTO> getAllActiveCategories() {
    return categoryRepository.findByActiveOrderByDisplayOrder(true).stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  @Override
  public PaginationResponse<CategoryDTO> getAllCategories(Pageable pageable) {
    Page<Category> page = categoryRepository.findAll(pageable);
    return convertToPaginationResponse(page);
  }

  private CategoryDTO convertToDTO(Category category) {
    return CategoryDTO.builder()
        .id(category.getId())
        .name(category.getName())
        .description(category.getDescription())
        .image(category.getImage())
        .slug(category.getSlug())
        .active(category.isActive())
        .displayOrder(category.getDisplayOrder())
        .parentId(category.getParentId())
        .createdAt(category.getCreatedAt())
        .build();
  }

  private PaginationResponse<CategoryDTO> convertToPaginationResponse(Page<Category> page) {
    List<CategoryDTO> content = page.getContent().stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());

    return new PaginationResponse<>(
        content,
        page.getNumber(),
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages(),
        page.hasNext(),
        page.hasPrevious(),
        page.isFirst(),
        page.isLast());
  }
}
