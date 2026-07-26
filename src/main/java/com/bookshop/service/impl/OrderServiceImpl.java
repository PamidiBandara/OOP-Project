package com.bookshop.service.impl;

import com.bookshop.dto.OrderDTO;
import com.bookshop.dto.OrderDTO.OrderItemDTO;
import com.bookshop.dto.OrderDTO.OrderTrackingDTO;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.entity.Order;
import com.bookshop.entity.Order.OrderItem;
import com.bookshop.entity.Order.OrderTracking;
import com.bookshop.entity.Product;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.OrderRepository;
import com.bookshop.repository.ProductRepository;
import com.bookshop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;

  @Override
  public OrderDTO createOrder(String userId, OrderDTO orderDTO) {
    Order order = new Order();
    order.setUserId(userId);
    order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
    order.setStatus("PENDING");
    order.setItems(orderDTO.getItems().stream()
        .map(itemDTO -> new OrderItem(
            itemDTO.getProductId(),
            itemDTO.getProductName(),
            itemDTO.getQuantity(),
            itemDTO.getPrice(),
            itemDTO.getSubtotal(),
            itemDTO.getImage()))
        .collect(Collectors.toList()));

    order.setSubtotal(orderDTO.getSubtotal());
    order.setShippingCost(orderDTO.getShippingCost());
    order.setTax(orderDTO.getTax() != null ? orderDTO.getTax() : 0.0);
    order.setDiscount(orderDTO.getDiscount() != null ? orderDTO.getDiscount() : 0.0);
    order.setTotalAmount(orderDTO.getTotalAmount());
    order.setPaymentMethod(orderDTO.getPaymentMethod());
    order.setPaymentStatus("PENDING");
    order.setPaymentSlipUrl(orderDTO.getPaymentSlipUrl());
    order.setShippingAddress(orderDTO.getShippingAddress());
    order.setBillingAddress(orderDTO.getBillingAddress());
    order.setNotes(orderDTO.getNotes());
    order.setCancellable(true);

    OrderTracking tracking = new OrderTracking();
    tracking.setPendingAt(LocalDateTime.now());
    order.setTracking(tracking);

    order.setCreatedAt(LocalDateTime.now());
    order.setUpdatedAt(LocalDateTime.now());

    order = orderRepository.save(order);
    return convertToDTO(order);
  }

  @Override
  public OrderDTO getOrder(String orderId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    return convertToDTO(order);
  }

  @Override
  public OrderDTO updateOrderStatus(String orderId, String status) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

    order.setStatus(status);

    if ("SHIPPED".equals(status) && order.getTracking() != null) {
      order.getTracking().setShippedAt(LocalDateTime.now());
    } else if ("DELIVERED".equals(status) && order.getTracking() != null) {
      order.getTracking().setDeliveredAt(LocalDateTime.now());
    }

    order.setUpdatedAt(LocalDateTime.now());
    order = orderRepository.save(order);

    return convertToDTO(order);
  }

  @Override
  public PaginationResponse<OrderDTO> getUserOrders(String userId, Pageable pageable) {
    Page<Order> page = orderRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    return convertToPaginationResponse(page);
  }

  @Override
  public PaginationResponse<OrderDTO> getOrdersByStatus(String status, Pageable pageable) {
    Page<Order> page = orderRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
    return convertToPaginationResponse(page);
  }

  @Override
  public PaginationResponse<OrderDTO> getAllOrders(Pageable pageable) {
    Page<Order> page = orderRepository.findAllByOrderByCreatedAtDesc(pageable);
    return convertToPaginationResponse(page);
  }

  @Override
  public OrderDTO cancelOrder(String orderId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

    if (!order.isCancellable()) {
      throw new IllegalArgumentException("Order cannot be cancelled");
    }

    order.setStatus("CANCELLED");
    order.setCancellable(false);
    order.setUpdatedAt(LocalDateTime.now());

    order = orderRepository.save(order);
    return convertToDTO(order);
  }

  @Override
  public List<OrderDTO> getRecentOrders(int limit) {
    Page<Order> page = orderRepository.findAllByOrderByCreatedAtDesc(
        org.springframework.data.domain.PageRequest.of(0, limit));
    return page.getContent().stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  @Override
  public long getTotalOrders() {
    return orderRepository.count();
  }

  @Override
  public long getOrdersCountByStatus(String status) {
    return orderRepository.countByStatus(status);
  }

  private OrderDTO convertToDTO(Order order) {
    List<OrderItemDTO> itemDTOs = order.getItems().stream()
        .map(item -> OrderDTO.OrderItemDTO.builder()
            .productId(item.getProductId())
            .productName(item.getProductName())
            .quantity(item.getQuantity())
            .price(item.getPrice())
            .subtotal(item.getSubtotal())
            .image(item.getImage())
            .build())
        .collect(Collectors.toList());

    OrderTrackingDTO trackingDTO = null;
    if (order.getTracking() != null) {
      trackingDTO = OrderDTO.OrderTrackingDTO.builder()
          .pendingAt(order.getTracking().getPendingAt())
          .confirmedAt(order.getTracking().getConfirmedAt())
          .shippedAt(order.getTracking().getShippedAt())
          .deliveredAt(order.getTracking().getDeliveredAt())
          .trackingNumber(order.getTracking().getTrackingNumber())
          .carrier(order.getTracking().getCarrier())
          .build();
    }

    return OrderDTO.builder()
        .id(order.getId())
        .orderNumber(order.getOrderNumber())
        .status(order.getStatus())
        .items(itemDTOs)
        .subtotal(order.getSubtotal())
        .shippingCost(order.getShippingCost())
        .tax(order.getTax())
        .discount(order.getDiscount())
        .totalAmount(order.getTotalAmount())
        .paymentMethod(order.getPaymentMethod())
        .paymentStatus(order.getPaymentStatus())
        .paymentId(order.getPaymentId())
        .paymentSlipUrl(order.getPaymentSlipUrl())
        .shippingAddress(order.getShippingAddress())
        .billingAddress(order.getBillingAddress())
        .notes(order.getNotes())
        .cancellable(order.isCancellable())
        .tracking(trackingDTO)
        .createdAt(order.getCreatedAt())
        .build();
  }

  private PaginationResponse<OrderDTO> convertToPaginationResponse(Page<Order> page) {
    List<OrderDTO> content = page.getContent().stream()
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
