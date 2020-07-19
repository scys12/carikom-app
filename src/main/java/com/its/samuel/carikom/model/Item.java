package com.its.samuel.carikom.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Table(name="items")
@Data
@Entity
@NoArgsConstructor
public class Item {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    private String description;
    private int price;
    private int isBought;

    public Item(@NotNull String name, String description, int price, int isBought, User userOwner, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.isBought = isBought;
        this.userOwner = userOwner;
        this.category = category;
    }

    @ManyToOne(cascade = CascadeType.DETACH)
    private User userOwner;

    @ManyToOne(cascade = CascadeType.DETACH)
    private Category category;
}
