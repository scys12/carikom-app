package com.its.samuel.carikom.repository;

import com.its.samuel.carikom.model.ERole;
import com.its.samuel.carikom.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
