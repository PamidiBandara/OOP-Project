package com.bookshop.dto;

import lombok.*;
import java.time.LocalDateTime;

/**
 * User DTO for API responses and requests
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String avatar;
    private String role;
    private boolean emailVerified;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
