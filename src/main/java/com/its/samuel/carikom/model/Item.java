package com.its.samuel.carikom.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name="item")
@Data
@Entity
@NoArgsConstructor
public class Item {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;
    private String description;
    private int price;
    private boolean isBought;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User userOwner;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Category category;
}
