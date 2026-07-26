package com.bookshop.repository;

import com.bookshop.entity.DeliveryAddress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * DeliveryAddress Repository
 */
@Repository
public interface DeliveryAddressRepository extends MongoRepository<DeliveryAddress, String> {

    List<DeliveryAddress> findByUserId(String userId);

    Optional<DeliveryAddress> findByUserIdAndIsDefault(String userId, boolean isDefault);
}
