package com.its.samuel.carikom.controller;

import com.its.samuel.carikom.model.Item;
import com.its.samuel.carikom.model.User;
import com.its.samuel.carikom.repository.ItemRepository;
import com.its.samuel.carikom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

@RequestMapping("/api")
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class SearchController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/search")
    Page<?> searchGlobally(@RequestParam String type, @RequestParam String searchWord, Pageable pageable){
        if (type.equals("product")){
            return itemRepository.findByNameContainingAndIsBought(searchWord, 0, pageable);
        }
        else if (type.equals("user")) return  userRepository.findByNamaContaining(searchWord, pageable);
        else throw new  ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
