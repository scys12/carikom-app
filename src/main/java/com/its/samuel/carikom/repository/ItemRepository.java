package com.its.samuel.carikom.repository;

import com.its.samuel.carikom.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByIsBought(Integer isBought, Pageable pageable);
    Page<Item> findByUserId(Long userId, Pageable pageable);
    Page<Item> findByNameContainingAndIsBought(String name, Integer isBought, Pageable pageable);
    Optional<Item> findByName(String name);
    Page<Item> findByCategoryId(Long categoryId, Pageable pageable);
    Long countByCategoryId(Long categoryId);
    @Query(value = "select * from items where is_bought = 0 order by id desc limit 6", nativeQuery = true)
    List<Item> findByIsBoughtOrderByIdDesc();
}
