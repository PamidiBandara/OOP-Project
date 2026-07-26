package com.bookshop.service.impl;

import com.bookshop.dto.UserDTO;
import com.bookshop.entity.User;
import com.bookshop.exception.ResourceNotFoundException;
import com.bookshop.repository.UserRepository;
import com.bookshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public UserDTO getUserProfile(String userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    return convertToDTO(user);
  }

  @Override
  public UserDTO updateUserProfile(String userId, UserDTO dto) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    user.setFirstName(dto.getFirstName());
    user.setLastName(dto.getLastName());
    user.setPhone(dto.getPhone());
    user.setAvatar(dto.getAvatar());
    user.setUpdatedAt(LocalDateTime.now());

    user = userRepository.save(user);
    return convertToDTO(user);
  }

  @Override
  public void changePassword(String userId, String oldPassword, String newPassword) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
      throw new IllegalArgumentException("Old password is incorrect");
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    user.setUpdatedAt(LocalDateTime.now());
    userRepository.save(user);
  }

  @Override
  public void deleteUserAccount(String userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    user.setActive(false);
    user.setUpdatedAt(LocalDateTime.now());
    userRepository.save(user);
  }

  @Override
  public boolean existsById(String userId) {
    return userRepository.existsById(userId);
  }

  @Override
  public UserDTO uploadAvatar(String userId, String avatarUrl) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    user.setAvatar(avatarUrl);
    user.setUpdatedAt(LocalDateTime.now());
    user = userRepository.save(user);

    return convertToDTO(user);
  }

  @Override
  public Page<UserDTO> getAllCustomers(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    return userRepository.findAll(pageable).map(this::convertToDTO);
  }

  private UserDTO convertToDTO(User user) {
    return new UserDTO(
        user.getId(),
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        user.getPhone(),
        user.getAvatar(),
        user.getRole(),
        user.isEmailVerified(),
        user.isActive(),
        user.getCreatedAt(),
        user.getUpdatedAt()
    );
  }
}
