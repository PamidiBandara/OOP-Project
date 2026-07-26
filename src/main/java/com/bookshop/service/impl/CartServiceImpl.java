package com.bookshop.service.impl;

import com.bookshop.dto.CartDTO;
import com.bookshop.dto.CartDTO.CartItemDTO;
import com.bookshop.entity.Cart;
import com.bookshop.entity.Cart.CartItem;
import com.bookshop.entity.Product;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.CartRepository;
import com.bookshop.repository.ProductRepository;
import com.bookshop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
  private final CartRepository cartRepository;
  private final ProductRepository productRepository;

  @Override
  public CartDTO getCart(String userId) {
    Cart cart = cartRepository.findByUserId(userId)
        .orElse(Cart.builder().userId(userId).items(new ArrayList<>()).subtotal(0.0).shippingCost(0.0).totalAmount(0.0).createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build());
    return convertToDTO(cart);
  }

  @Override
  public CartDTO addToCart(String userId, String productId, int quantity) {
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    
    if (product.getStock() < quantity) {
      throw new IllegalArgumentException("Insufficient stock");
    }

    Cart cart = cartRepository.findByUserId(userId)
        .orElse(Cart.builder().userId(userId).items(new ArrayList<>()).subtotal(0.0).shippingCost(0.0).totalAmount(0.0).createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build());

    Optional<CartItem> existingItem = cart.getItems().stream()
        .filter(item -> item.getProductId().equals(productId))
        .findFirst();

    if (existingItem.isPresent()) {
      CartItem item = existingItem.get();
      item.setQuantity(item.getQuantity() + quantity);
      item.setSubtotal(item.getQuantity() * item.getPrice());
    } else {
      CartItem newItem = CartItem.builder()
          .productId(productId)
          .productName(product.getName())
          .quantity(quantity)
          .price(product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice())
          .subtotal(quantity * (product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice()))
          .image(product.getMainImage())
          .stock(product.getStock())
          .build();
      cart.getItems().add(newItem);
    }

    calculateCartTotals(cart);
    cart.setUpdatedAt(LocalDateTime.now());
    cart = cartRepository.save(cart);
    
    return convertToDTO(cart);
  }

  @Override
  public CartDTO removeFromCart(String userId, String productId) {
    Cart cart = cartRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

    cart.setItems(cart.getItems().stream()
        .filter(item -> !item.getProductId().equals(productId))
        .collect(Collectors.toList()));

    calculateCartTotals(cart);
    cart.setUpdatedAt(LocalDateTime.now());
    cart = cartRepository.save(cart);
    
    return convertToDTO(cart);
  }

  @Override
  public CartDTO updateCartItemQuantity(String userId, String productId, int quantity) {
    Cart cart = cartRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

    if (product.getStock() < quantity) {
      throw new IllegalArgumentException("Insufficient stock");
    }

    cart.getItems().forEach(item -> {
      if (item.getProductId().equals(productId)) {
        item.setQuantity(quantity);
        item.setSubtotal(quantity * item.getPrice());
      }
    });

    calculateCartTotals(cart);
    cart.setUpdatedAt(LocalDateTime.now());
    cart = cartRepository.save(cart);
    
    return convertToDTO(cart);
  }

  @Override
  public CartDTO clearCart(String userId) {
    Cart cart = cartRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

    cart.setItems(new ArrayList<>());
    cart.setSubtotal(0.0);
    cart.setTotalAmount(0.0);
    cart.setDiscountAmount(0.0);
    cart.setUpdatedAt(LocalDateTime.now());
    cart = cartRepository.save(cart);
    
    return convertToDTO(cart);
  }

  @Override
  public CartDTO applyCoupon(String userId, String couponCode) {
    Cart cart = cartRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

    cart.setCouponCode(couponCode);
    cart.setDiscountAmount(cart.getSubtotal() * 0.1); // Example: 10% discount
    calculateCartTotals(cart);
    cart.setUpdatedAt(LocalDateTime.now());
    cart = cartRepository.save(cart);
    
    return convertToDTO(cart);
  }

  @Override
  public CartDTO removeCoupon(String userId) {
    Cart cart = cartRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

    cart.setCouponCode(null);
    cart.setDiscountAmount(0.0);
    calculateCartTotals(cart);
    cart.setUpdatedAt(LocalDateTime.now());
    cart = cartRepository.save(cart);
    
    return convertToDTO(cart);
  }

  @Override
  public long getTotalCartItems(String userId) {
    Cart cart = cartRepository.findByUserId(userId).orElse(null);
    if (cart == null) return 0;
    return cart.getItems().stream().mapToLong(CartItem::getQuantity).sum();
  }

  private void calculateCartTotals(Cart cart) {
    double subtotal = cart.getItems().stream()
        .mapToDouble(CartItem::getSubtotal)
        .sum();
    
    cart.setSubtotal(subtotal);
    double shippingCost = subtotal > 50 ? 0 : 5.0;
    cart.setShippingCost(shippingCost);
    
    double discountAmount = cart.getDiscountAmount() != null ? cart.getDiscountAmount() : 0.0;
    double total = subtotal + shippingCost - discountAmount;
    cart.setTotalAmount(total);
  }

  private CartDTO convertToDTO(Cart cart) {
    List<CartItemDTO> itemDTOs = cart.getItems().stream()
        .map(item -> CartDTO.CartItemDTO.builder()
            .productId(item.getProductId())
            .productName(item.getProductName())
            .quantity(item.getQuantity())
            .price(item.getPrice())
            .subtotal(item.getSubtotal())
            .image(item.getImage())
            .stock(item.getStock())
            .build())
        .collect(Collectors.toList());

    return CartDTO.builder()
        .id(cart.getId())
        .userId(cart.getUserId())
        .items(itemDTOs)
        .subtotal(cart.getSubtotal())
        .shippingCost(cart.getShippingCost())
        .totalAmount(cart.getTotalAmount())
        .couponCode(cart.getCouponCode())
        .discountAmount(cart.getDiscountAmount())
        .updatedAt(cart.getUpdatedAt())
        .build();
  }
}
