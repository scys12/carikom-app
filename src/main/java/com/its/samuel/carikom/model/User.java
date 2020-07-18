package com.its.samuel.carikom.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Entity
@Data
@Table(name="users",uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email") 
})
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Email @Size(max = 50)
    @Column(name="email")
    private String email;
    @Column(name="lokasi")
    private String lokasi;
    @Column(name="name")
    private String name;
    @Column(name="username")
    private String username;
    @Column(name="nomor_telp")
    private String nomor_telp;

    @Size(max = 120)
    @Column(name="password")
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(@Email @Size(max = 50) String email, String lokasi, String name, String username, String nomor_telp, @Size(max = 120) String password) {
        this.email = email;
        this.lokasi = lokasi;
        this.name = name;
        this.username = username;
        this.nomor_telp = nomor_telp;
        this.password = password;
    }
}