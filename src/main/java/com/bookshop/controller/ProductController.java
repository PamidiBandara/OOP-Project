package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.CreateProductRequest;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.dto.ProductDTO;
import com.bookshop.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Product Controller
 */
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(@Valid @RequestBody CreateProductRequest request) {
        ProductDTO product = productService.createProduct(request);
        return new ResponseEntity<>(ApiResponse.success("Product created successfully", product), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(@PathVariable String id, @Valid @RequestBody CreateProductRequest request) {
        ProductDTO product = productService.updateProduct(id, request);
        return new ResponseEntity<>(ApiResponse.success("Product updated successfully", product), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(ApiResponse.success("Product deleted successfully"), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProduct(@PathVariable String id) {
        ProductDTO product = productService.getProduct(id);
        return new ResponseEntity<>(ApiResponse.success(product), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<ProductDTO>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        PaginationResponse<ProductDTO> response = productService.getAllProducts(pageable);
        return new ResponseEntity<>(ApiResponse.success(response), HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<PaginationResponse<ProductDTO>>> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PaginationResponse<ProductDTO> response = productService.getProductsByCategory(category, pageable);
        return new ResponseEntity<>(ApiResponse.success(response), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PaginationResponse<ProductDTO>>> searchProducts(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        PaginationResponse<ProductDTO> response = productService.searchProducts(query, pageable);
        return new ResponseEntity<>(ApiResponse.success(response), HttpStatus.OK);
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getFeaturedProducts() {
        List<ProductDTO> products = productService.getFeaturedProducts();
        return new ResponseEntity<>(ApiResponse.success(products), HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getLatestProducts(
            @RequestParam(defaultValue = "10") int limit) {
        List<ProductDTO> products = productService.getLatestProducts(limit);
        return new ResponseEntity<>(ApiResponse.success(products), HttpStatus.OK);
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getBestSellers(
            @RequestParam(defaultValue = "10") int limit) {
        List<ProductDTO> products = productService.getBestSellers(limit);
        return new ResponseEntity<>(ApiResponse.success(products), HttpStatus.OK);
    }

    @GetMapping("/low-stock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getLowStockProducts() {
        List<ProductDTO> products = productService.getLowStockProducts();
        return new ResponseEntity<>(ApiResponse.success(products), HttpStatus.OK);
    }
}
