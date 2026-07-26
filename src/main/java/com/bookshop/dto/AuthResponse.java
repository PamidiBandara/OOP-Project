package com.bookshop.dto;

import lombok.*;

/**
 * Authentication Response DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String refreshToken;
    private UserDTO user;
    private String message;
}
