package com.bookshop.service;

import com.bookshop.dto.OrderDTO;
import com.bookshop.dto.PaginationResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Order Service Interface
 */
public interface OrderService {

    OrderDTO createOrder(String userId, OrderDTO request);

    OrderDTO getOrder(String orderId);

    OrderDTO updateOrderStatus(String orderId, String status);

    PaginationResponse<OrderDTO> getUserOrders(String userId, Pageable pageable);

    PaginationResponse<OrderDTO> getOrdersByStatus(String status, Pageable pageable);

    PaginationResponse<OrderDTO> getAllOrders(Pageable pageable);

    OrderDTO cancelOrder(String orderId);

    List<OrderDTO> getRecentOrders(int limit);

    long getTotalOrders();

    long getOrdersCountByStatus(String status);
}
