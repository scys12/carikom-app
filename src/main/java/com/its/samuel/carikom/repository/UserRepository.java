package com.its.samuel.carikom.repository;

import com.its.samuel.carikom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
