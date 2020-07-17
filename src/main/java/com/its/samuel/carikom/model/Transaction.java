package com.its.samuel.carikom.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@Table(name="transaction")
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Instant buydate;
    private int totalCost;

    @ManyToOne
    private User user;

    @ManyToOne
    private Item item;

}
