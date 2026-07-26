package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.PaginationResponse;
import com.bookshop.entity.Notification;
import com.bookshop.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
@CrossOrigin("*")
@PreAuthorize("hasRole('CUSTOMER')")
@RequiredArgsConstructor
public class NotificationController {
  private final NotificationService notificationService;

  @GetMapping
  public ResponseEntity<ApiResponse<PaginationResponse<Notification>>> getUserNotifications(
      Authentication authentication,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    String userId = authentication.getName();
    Pageable pageable = PageRequest.of(page, size);
    PaginationResponse<Notification> notifications = notificationService.getUserNotifications(userId, pageable);
    return ResponseEntity.ok(ApiResponse.success("Notifications retrieved successfully", notifications));
  }

  @PutMapping("/{notificationId}/read")
  public ResponseEntity<ApiResponse<Void>> markAsRead(
      @PathVariable String notificationId) {
    notificationService.markAsRead(notificationId);
    return ResponseEntity.ok(ApiResponse.success("Notification marked as read", null));
  }

  @PutMapping("/read-all")
  public ResponseEntity<ApiResponse<Void>> markAllAsRead(Authentication authentication) {
    String userId = authentication.getName();
    notificationService.markAllAsRead(userId);
    return ResponseEntity.ok(ApiResponse.success("All notifications marked as read", null));
  }

  @GetMapping("/unread-count")
  public ResponseEntity<ApiResponse<Long>> getUnreadCount(Authentication authentication) {
    String userId = authentication.getName();
    long count = notificationService.getUnreadCount(userId);
    return ResponseEntity.ok(ApiResponse.success("Unread count retrieved", count));
  }

  @DeleteMapping("/{notificationId}")
  public ResponseEntity<ApiResponse<Void>> deleteNotification(
      @PathVariable String notificationId) {
    notificationService.deleteNotification(notificationId);
    return ResponseEntity.ok(ApiResponse.success("Notification deleted successfully", null));
  }
}
