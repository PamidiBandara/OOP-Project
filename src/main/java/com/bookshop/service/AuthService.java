package com.bookshop.service;

import com.bookshop.dto.AuthResponse;
import com.bookshop.dto.LoginRequest;
import com.bookshop.dto.RegisterRequest;
import com.bookshop.dto.UserDTO;

/**
 * Authentication Service Interface
 */
public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserDTO getCurrentUser(String email);

    void logout();

    AuthResponse refreshToken(String token);

    void forgotPassword(String email);

    void resetPassword(String token, String newPassword);
}
