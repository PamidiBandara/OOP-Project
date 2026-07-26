package com.bookshop.service.impl;

import com.bookshop.dto.PaginationResponse;
import com.bookshop.dto.WishlistDTO;
import com.bookshop.entity.Product;
import com.bookshop.entity.Wishlist;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.WishlistRepository;
import com.bookshop.repository.ProductRepository;
import com.bookshop.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
// OOP CONCEPT: POLYMORPHISM
// This class implements the WishlistService interface. At runtime, Spring Boot
// injects this specific implementation into controllers that ask for a
// WishlistService.
// By overriding (@Override) the interface methods, this class provides the
// actual behavior.
public class WishlistServiceImpl implements WishlistService {
  private final WishlistRepository wishlistRepository;
  private final ProductRepository productRepository;

  @Override
  public void addToWishlist(String userId, String productId) {
    if (!productRepository.existsById(productId)) {
      throw new ResourceNotFoundException("Product not found");
    }

    Wishlist wishlist = wishlistRepository.findByUserId(userId)
        .orElse(new Wishlist(null, userId, new ArrayList<>(), LocalDateTime.now(), LocalDateTime.now()));

    if (wishlist.getProductIds() == null) {
      wishlist.setProductIds(new ArrayList<>());
    }

    if (!wishlist.getProductIds().contains(productId)) {
      wishlist.getProductIds().add(productId);
    }

    wishlist.setUpdatedAt(LocalDateTime.now());
    wishlistRepository.save(wishlist);
  }

  @Override
  public void removeFromWishlist(String userId, String productId) {
    Wishlist wishlist = wishlistRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Wishlist not found"));

    if (wishlist.getProductIds() != null) {
      wishlist.setProductIds(wishlist.getProductIds().stream()
          .filter(id -> !id.equals(productId))
          .collect(Collectors.toList()));
    }

    wishlist.setUpdatedAt(LocalDateTime.now());
    wishlistRepository.save(wishlist);
  }

  @Override
  public boolean isInWishlist(String userId, String productId) {
    Wishlist wishlist = wishlistRepository.findByUserId(userId).orElse(null);
    if (wishlist == null)
      return false;
    return wishlist.getProductIds().contains(productId);
  }

  @Override
  public WishlistDTO getWishlist(String userId) {
    Wishlist wishlist = wishlistRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Wishlist not found"));

    List<Product> products = new ArrayList<>();
    if (wishlist.getProductIds() != null && !wishlist.getProductIds().isEmpty()) {
      products = (List<Product>) productRepository.findAllById(wishlist.getProductIds());
    }

    return WishlistDTO.builder()
        .id(wishlist.getId())
        .userId(wishlist.getUserId())
        .items(products)
        .createdAt(wishlist.getCreatedAt())
        .updatedAt(wishlist.getUpdatedAt())
        .build();
  }

  @Override
  public void clearWishlist(String userId) {
    Wishlist wishlist = wishlistRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Wishlist not found"));

    wishlist.setProductIds(new ArrayList<>());
    wishlist.setUpdatedAt(LocalDateTime.now());
    wishlistRepository.save(wishlist);
  }

  @Override
  public long getWishlistCount(String userId) {
    Wishlist wishlist = wishlistRepository.findByUserId(userId).orElse(null);
    if (wishlist == null)
      return 0;
    return wishlist.getProductIds().size();
  }
}
