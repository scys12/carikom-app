package com.its.samuel.carikom.repository;

import com.its.samuel.carikom.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
