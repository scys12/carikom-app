package com.its.samuel.carikom.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String lokasi;
    private String nama;
    private String telepon;
    private List<String> roles;

    public JwtResponse(String token, Long id, String username, String email, String lokasi, String nama, String telepon, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.lokasi = lokasi;
        this.nama = nama;
        this.telepon = telepon;
        this.roles = roles;
    }
}
