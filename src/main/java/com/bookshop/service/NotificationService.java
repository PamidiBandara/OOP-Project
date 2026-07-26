package com.bookshop.service;

import com.bookshop.dto.PaginationResponse;
import org.springframework.data.domain.Pageable;

/**
 * Notification Service Interface
 */
public interface NotificationService {

    void createNotification(String userId, String title, String message, String type, String relatedId);

    PaginationResponse<com.bookshop.entity.Notification> getUserNotifications(String userId, Pageable pageable);

    void markAsRead(String notificationId);

    void markAllAsRead(String userId);

    long getUnreadCount(String userId);

    void deleteNotification(String notificationId);
}
