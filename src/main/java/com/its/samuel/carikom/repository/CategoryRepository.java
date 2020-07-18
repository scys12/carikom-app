package com.its.samuel.carikom.repository;

import com.its.samuel.carikom.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
