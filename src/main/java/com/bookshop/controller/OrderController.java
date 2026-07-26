package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.OrderDTO;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
@RequiredArgsConstructor
public class OrderController {
  private final OrderService orderService;

  @GetMapping
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<PaginationResponse<OrderDTO>>> getUserOrders(
      Authentication authentication,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    String userId = authentication.getName();
    Pageable pageable = PageRequest.of(page, size);
    PaginationResponse<OrderDTO> orders = orderService.getUserOrders(userId, pageable);
    return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully", orders));
  }

  @GetMapping("/{orderId}")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<OrderDTO>> getOrder(
      @PathVariable String orderId) {
    OrderDTO order = orderService.getOrder(orderId);
    return ResponseEntity.ok(ApiResponse.success("Order retrieved successfully", order));
  }

  @PostMapping
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<OrderDTO>> createOrder(
      Authentication authentication,
      @RequestBody OrderDTO orderDTO) {
    String userId = authentication.getName();
    OrderDTO order = orderService.createOrder(userId, orderDTO);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.success("Order created successfully", order));
  }

  @PutMapping("/{orderId}/status")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<OrderDTO>> updateOrderStatus(
      @PathVariable String orderId,
      @RequestParam String status) {
    OrderDTO order = orderService.updateOrderStatus(orderId, status);
    return ResponseEntity.ok(ApiResponse.success("Order status updated", order));
  }

  @DeleteMapping("/{orderId}")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<OrderDTO>> cancelOrder(
      @PathVariable String orderId) {
    OrderDTO order = orderService.cancelOrder(orderId);
    return ResponseEntity.ok(ApiResponse.success("Order cancelled successfully", order));
  }

  @GetMapping("/admin/all")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<PaginationResponse<OrderDTO>>> getAllOrders(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    Pageable pageable = PageRequest.of(page, size);
    PaginationResponse<OrderDTO> orders = orderService.getAllOrders(pageable);
    return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully", orders));
  }

  @GetMapping("/admin/status/{status}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<PaginationResponse<OrderDTO>>> getOrdersByStatus(
      @PathVariable String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    Pageable pageable = PageRequest.of(page, size);
    PaginationResponse<OrderDTO> orders = orderService.getOrdersByStatus(status, pageable);
    return ResponseEntity.ok(ApiResponse.success("Orders retrieved successfully", orders));
  }
}
