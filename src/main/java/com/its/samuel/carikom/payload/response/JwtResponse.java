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
    private String name;
    private String nomor_telp;
    private List<String> roles;

    public JwtResponse(String token, Long id, String username, String email, String lokasi, String name, String nomor_telp, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.lokasi = lokasi;
        this.name = name;
        this.nomor_telp = nomor_telp;
        this.roles = roles;
    }
}
