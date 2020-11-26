package com.its.samuel.carikom.controller;

import com.its.samuel.carikom.model.ERole;
import com.its.samuel.carikom.model.Role;
import com.its.samuel.carikom.model.User;
import com.its.samuel.carikom.payload.request.LoginRequest;
import com.its.samuel.carikom.payload.request.SignupRequest;
import com.its.samuel.carikom.payload.response.JwtResponse;
import com.its.samuel.carikom.payload.response.MessageResponse;
import com.its.samuel.carikom.repository.RoleRepository;
import com.its.samuel.carikom.repository.UserRepository;
import com.its.samuel.carikom.security.JwtUtils;
import com.its.samuel.carikom.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(
                item -> item.getAuthority()).collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), userDetails.getLokasi(), userDetails.getNama(), userDetails.getTelepon(), roles));
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username sudah dipakai! Silahkan pilih username lain"));
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email sudah dipakai! Silahkan memakai email lain"));
        }

        User user = new User(signupRequest.getEmail(), signupRequest.getLokasi(), signupRequest.getNama(), signupRequest.getUsername(), signupRequest.getTelepon(), passwordEncoder.encode(signupRequest.getPassword()));

        Set<String> strRoles = signupRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error : Role is not found"));
            roles.add(userRole);
        }else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User berhasil ditambahkan! Sekarang anda dapat masuk melalui akun anda yang baru dibuat"));
    }

    @PutMapping("/user/edit")
    ResponseEntity<?> editProfile(@RequestBody @Valid SignupRequest signupRequest, Principal principal){
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        User user = new User(signupRequest.getEmail(), signupRequest.getLokasi(), signupRequest.getNama(), signupRequest.getUsername(), signupRequest.getTelepon(), passwordEncoder.encode(signupRequest.getPassword()));
        User oldUser = new User();
        currentUser.map(userData ->{
            oldUser.setEmail(userData.getEmail());
            user.setId(userData.getId());
            user.setRoles(userData.getRoles());
            return user;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Terdapat kesalahan. Harap mengulang kembali"));
        if (userRepository.existsByUsername(signupRequest.getUsername()) && !(signupRequest.getUsername().equals(principal.getName()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username sudah dipakai! Silahkan pilih username lain"));
        }
        if (userRepository.existsByEmail(signupRequest.getEmail()) && !(signupRequest.getEmail().equals(oldUser.getEmail()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email sudah dipakai! Silahkan memakai email lain"));
        }
        Authentication oldAuth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(principal.getName(), signupRequest.getPassword())
        );
        userRepository.save(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), signupRequest.getPassword())
        );
        SecurityContextHolder.clearContext();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(
                item -> item.getAuthority()).collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), userDetails.getLokasi(), userDetails.getNama(), userDetails.getTelepon(), roles));
    }

    @GetMapping("user/{username}")
    ResponseEntity<User> getUserProfile(@PathVariable String username){
        return userRepository.findByUsername(username).map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
