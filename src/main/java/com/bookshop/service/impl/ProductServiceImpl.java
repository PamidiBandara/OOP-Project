package com.bookshop.service.impl;

import com.bookshop.dto.CreateProductRequest;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.dto.ProductDTO;
import com.bookshop.entity.Product;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.ProductRepository;
import com.bookshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Product Service Implementation
 */
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductDTO createProduct(CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .type(request.getType() != null ? request.getType() : "Book")
                .description(request.getDescription())
                .sku(request.getSku())
                .isbn(request.getIsbn())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .discountPercentage(request.getDiscountPercentage())
                .stock(request.getStock())
                .minStock(request.getMinStock())
                .images(request.getImages())
                .mainImage(request.getMainImage())
                .category(request.getCategory())
                .author(request.getAuthor())
                .publisher(request.getPublisher())
                .brand(request.getBrand())
                .pages(request.getPages())
                .language(request.getLanguage())
                .edition(request.getEdition())
                .publicationDate(request.getPublicationDate())
                .active(request.isActive())
                .featured(request.isFeatured())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    @Override
    public ProductDTO updateProduct(String id, CreateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setName(request.getName());
        product.setType(request.getType() != null ? request.getType() : "Book");
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setDiscountPercentage(request.getDiscountPercentage());
        product.setStock(request.getStock());
        product.setImages(request.getImages());
        product.setMainImage(request.getMainImage());
        product.setActive(request.isActive());
        product.setFeatured(request.isFeatured());
        product.setUpdatedAt(LocalDateTime.now());

        Product updated = productRepository.save(product);
        return convertToDTO(updated);
    }

    @Override
    public void deleteProduct(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.delete(product);
    }

    @Override
    public ProductDTO getProduct(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return convertToDTO(product);
    }

    @Override
    public PaginationResponse<ProductDTO> getAllProducts(Pageable pageable) {
        Page<Product> page = productRepository.findByActiveOrderByCreatedAtDesc(true, pageable);
        return convertToPaginationResponse(page);
    }

    @Override
    public PaginationResponse<ProductDTO> getProductsByCategory(String category, Pageable pageable) {
        Page<Product> page = productRepository.findByCategoryAndActiveOrderByCreatedAtDesc(category, true, pageable);
        return convertToPaginationResponse(page);
    }

    @Override
    public PaginationResponse<ProductDTO> searchProducts(String query, Pageable pageable) {
        Page<Product> page = productRepository.findByNameContainingIgnoreCaseAndActive(query, true, pageable);
        return convertToPaginationResponse(page);
    }

    @Override
    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByFeaturedAndActive(true, true)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getLatestProducts(int limit) {
        return productRepository.findByActiveOrderByCreatedAtDesc(true, Pageable.ofSize(limit))
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getBestSellers(int limit) {
        return productRepository.findByActiveOrderByCreatedAtDesc(true, Pageable.ofSize(limit))
                .stream()
                .sorted((a, b) -> Integer.compare(b.getSoldCount() != null ? b.getSoldCount() : 0, a.getSoldCount() != null ? a.getSoldCount() : 0))
                .limit(limit)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO addProductToCart(String productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        return convertToDTO(product);
    }

    @Override
    public ProductDTO removeFromStock(String productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setStock(product.getStock() - quantity);
        product.setUpdatedAt(LocalDateTime.now());
        Product updated = productRepository.save(product);

        return convertToDTO(updated);
    }

    @Override
    public List<ProductDTO> getLowStockProducts() {
        return productRepository.findByStockLessThan(10)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .type(product.getType())
                .description(product.getDescription())
                .sku(product.getSku())
                .isbn(product.getIsbn())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .discountPercentage(product.getDiscountPercentage())
                .stock(product.getStock())
                .images(product.getImages())
                .mainImage(product.getMainImage())
                .category(product.getCategory())
                .author(product.getAuthor())
                .publisher(product.getPublisher())
                .brand(product.getBrand())
                .pages(product.getPages())
                .language(product.getLanguage())
                .edition(product.getEdition())
                .publicationDate(product.getPublicationDate())
                .averageRating(product.getAverageRating())
                .reviewCount(product.getReviewCount())
                .soldCount(product.getSoldCount())
                .active(product.isActive())
                .featured(product.isFeatured())
                .createdAt(product.getCreatedAt())
                .build();
    }

    private PaginationResponse<ProductDTO> convertToPaginationResponse(Page<Product> page) {
        return PaginationResponse.<ProductDTO>builder()
                .content(page.getContent().stream().map(this::convertToDTO).collect(Collectors.toList()))
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .hasNext(page.hasNext())
                .hasPrevious(page.hasPrevious())
                .isFirst(page.isFirst())
                .isLast(page.isLast())
                .build();
    }
}
