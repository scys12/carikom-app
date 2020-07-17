package com.its.samuel.carikom.repository;

import com.its.samuel.carikom.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByUserOwner(Long userOwner);
    Optional<Item> findByUserOwnerAndName(Long userOwner, String name);
    Optional<Item> findByUserOwnerAndCategory(Long userOwner, Long category);
    Optional<Item> findByName(String name);
    Optional<Item> findByCategory(Long category);
}
