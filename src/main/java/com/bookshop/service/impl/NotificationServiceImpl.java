package com.bookshop.service.impl;

import com.bookshop.dto.PaginationResponse;
import com.bookshop.entity.Notification;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.NotificationRepository;
import com.bookshop.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
  private final NotificationRepository notificationRepository;

  @Override
  public void createNotification(String userId, String title, String message, String type, String relatedId) {
    Notification notification = new Notification();
    notification.setUserId(userId);
    notification.setTitle(title);
    notification.setMessage(message);
    notification.setType(type);
    notification.setRelatedId(relatedId);
    notification.setRead(false);
    notification.setCreatedAt(LocalDateTime.now());

    notificationRepository.save(notification);
  }

  @Override
  public PaginationResponse<Notification> getUserNotifications(String userId, Pageable pageable) {
    Page<Notification> page = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    return convertToPaginationResponse(page);
  }

  @Override
  public void markAsRead(String notificationId) {
    Notification notification = notificationRepository.findById(notificationId)
        .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

    notification.setRead(true);
    notification.setReadAt(LocalDateTime.now());
    notificationRepository.save(notification);
  }

  @Override
  public void markAllAsRead(String userId) {
    List<Notification> notifications = notificationRepository.findByUserIdAndReadFalse(userId);
    notifications.forEach(notification -> {
      notification.setRead(true);
      notification.setReadAt(LocalDateTime.now());
    });
    notificationRepository.saveAll(notifications);
  }

  @Override
  public long getUnreadCount(String userId) {
    return notificationRepository.countByUserIdAndReadFalse(userId);
  }

  @Override
  public void deleteNotification(String notificationId) {
    Notification notification = notificationRepository.findById(notificationId)
        .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

    notificationRepository.deleteById(notificationId);
  }

  private PaginationResponse<Notification> convertToPaginationResponse(Page<Notification> page) {
    List<Notification> content = page.getContent();

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
