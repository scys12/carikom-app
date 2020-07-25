package com.its.samuel.carikom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @Column(length = 512)
    private String description;
    private int price;
    private int isBought;

    public Item(@NotNull String name, String description, int price, int isBought, User user, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.isBought = isBought;
        this.user = user;
        this.category = category;
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false,cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private User user;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private Category category;

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", isBought=" + isBought +
                ", user=" + user +
                ", category=" + category +
                '}';
    }
}
