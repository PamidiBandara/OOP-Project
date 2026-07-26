package com.bookshop.service;

import com.bookshop.dto.CreateProductRequest;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.dto.ProductDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Product Service Interface
 */
public interface ProductService {

    ProductDTO createProduct(CreateProductRequest request);

    ProductDTO updateProduct(String id, CreateProductRequest request);

    void deleteProduct(String id);

    ProductDTO getProduct(String id);

    PaginationResponse<ProductDTO> getAllProducts(Pageable pageable);

    PaginationResponse<ProductDTO> getProductsByCategory(String category, Pageable pageable);

    PaginationResponse<ProductDTO> searchProducts(String query, Pageable pageable);

    List<ProductDTO> getFeaturedProducts();

    List<ProductDTO> getLatestProducts(int limit);

    List<ProductDTO> getBestSellers(int limit);

    ProductDTO addProductToCart(String productId, int quantity);

    ProductDTO removeFromStock(String productId, int quantity);

    List<ProductDTO> getLowStockProducts();
}
