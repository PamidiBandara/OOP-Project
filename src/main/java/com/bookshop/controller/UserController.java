package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.UserDTO;
import com.bookshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping("/profile")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<UserDTO>> getUserProfile(Authentication authentication) {
    String userId = authentication.getName();
    UserDTO user = userService.getUserProfile(userId);
    return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", user));
  }

  @PutMapping("/profile")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<UserDTO>> updateUserProfile(
      Authentication authentication,
      @RequestBody UserDTO userDTO) {
    String userId = authentication.getName();
    UserDTO user = userService.updateUserProfile(userId, userDTO);
    return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", user));
  }

  @PostMapping("/change-password")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<Void>> changePassword(
      Authentication authentication,
      @RequestParam String oldPassword,
      @RequestParam String newPassword) {
    String userId = authentication.getName();
    userService.changePassword(userId, oldPassword, newPassword);
    return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
  }

  @DeleteMapping("/account")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<Void>> deleteUserAccount(Authentication authentication) {
    String userId = authentication.getName();
    userService.deleteUserAccount(userId);
    return ResponseEntity.ok(ApiResponse.success("Account deleted successfully", null));
  }

  @PostMapping("/avatar")
  @PreAuthorize("hasRole('CUSTOMER')")
  public ResponseEntity<ApiResponse<UserDTO>> uploadAvatar(
      Authentication authentication,
      @RequestParam String avatarUrl) {
    String userId = authentication.getName();
    UserDTO user = userService.uploadAvatar(userId, avatarUrl);
    return ResponseEntity.ok(ApiResponse.success("Avatar uploaded successfully", user));
  }

  @GetMapping("/customers")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<Page<UserDTO>>> getAllCustomers(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<UserDTO> customers = userService.getAllCustomers(page, size);
    return ResponseEntity.ok(ApiResponse.success("Customers retrieved successfully", customers));
  }
}
