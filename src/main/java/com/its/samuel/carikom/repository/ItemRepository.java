package com.its.samuel.carikom.repository;

import com.its.samuel.carikom.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByUserId(Long userId, Pageable pageable);
//    Optional<Item> findByUserOwnerAndName(Long userOwner, String name);
//    Optional<Item> findByUserOwnerAndCategory(Long userOwner, Long category);
    Optional<Item> findByName(String name);
    Optional<Item> findByCategory(Long category);
}
