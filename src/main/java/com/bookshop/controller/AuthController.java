package com.bookshop.controller;

import com.bookshop.dto.ApiResponse;
import com.bookshop.dto.AuthResponse;
import com.bookshop.dto.LoginRequest;
import com.bookshop.dto.RegisterRequest;
import com.bookshop.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication Controller
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(ApiResponse.success("User registered successfully", response), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return new ResponseEntity<>(ApiResponse.success("Login successful", response), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>(ApiResponse.error("Unauthorized"), HttpStatus.UNAUTHORIZED);
        }
        Object principal = authentication.getPrincipal();
        // Implementation would get user from authentication
        return new ResponseEntity<>(ApiResponse.success("User retrieved", principal), HttpStatus.OK);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7); // Remove "Bearer " prefix
        AuthResponse response = authService.refreshToken(jwtToken);
        return new ResponseEntity<>(ApiResponse.success("Token refreshed", response), HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<?>> forgotPassword(@RequestParam String email) {
        authService.forgotPassword(email);
        return new ResponseEntity<>(ApiResponse.success("Password reset email sent"), HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<?>> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        authService.resetPassword(token, newPassword);
        return new ResponseEntity<>(ApiResponse.success("Password reset successfully"), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout() {
        authService.logout();
        return new ResponseEntity<>(ApiResponse.success("Logout successful"), HttpStatus.OK);
    }
}
