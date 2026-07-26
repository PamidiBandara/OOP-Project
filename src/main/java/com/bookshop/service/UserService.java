package com.bookshop.service;

import com.bookshop.dto.UserDTO;

/**
 * User Service Interface
 */
public interface UserService {

    UserDTO getUserProfile(String userId);

    UserDTO updateUserProfile(String userId, UserDTO request);

    void changePassword(String userId, String oldPassword, String newPassword);

    void deleteUserAccount(String userId);

    boolean existsById(String userId);

    UserDTO uploadAvatar(String userId, String avatarUrl);
    
    org.springframework.data.domain.Page<UserDTO> getAllCustomers(int page, int size);
}
