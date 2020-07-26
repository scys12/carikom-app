package com.its.samuel.carikom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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
    private long id;

    @Email @Size(max = 50)
    @NotBlank
    private String email;

    @NotBlank
    private String lokasi;

    @NotBlank
    private String nama;

    @NotBlank @Size(max = 20)
    private String username;

    @NotBlank
    private String telepon;

    @Size(max = 120)
    @Column(name="password")
    @JsonIgnore
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(@Email @Size(max = 50) String email, String lokasi, String nama, String username, String telepon, @Size(max = 120) String password) {
        this.email = email;
        this.lokasi = lokasi;
        this.nama = nama;
        this.username = username;
        this.telepon = telepon;
        this.password = password;
    }
}