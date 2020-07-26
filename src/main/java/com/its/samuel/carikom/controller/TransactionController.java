package com.its.samuel.carikom.controller;

import com.its.samuel.carikom.model.Item;
import com.its.samuel.carikom.model.Transaction;
import com.its.samuel.carikom.model.User;
import com.its.samuel.carikom.repository.ItemRepository;
import com.its.samuel.carikom.repository.TransactionRepository;
import com.its.samuel.carikom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.time.Instant;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/buy")
    ResponseEntity<Transaction> buyItem(@Valid @RequestBody Item item, Principal principal){
        Optional<User> user = userRepository.findByUsername(principal.getName());
        Optional<Item> itemToBuy = itemRepository.findById(item.getId());
        Transaction transaction = new Transaction();
        itemToBuy.map(it -> {
            System.out.println(it.getIsBought());
            if (it.getIsBought() == 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produk sudah terjual");
            transaction.setBuydate(Instant.now());
            it.setIsBought(1);
            transaction.setItem(it);
            transaction.setTotalCost(it.getPrice());
            return itemRepository.save(it);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return user.map( u -> {
            if (transaction.getItem().getUser().getId() == u.getId()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tidak bisa membeli produk sendiri");
            transaction.setUser(u);
            transactionRepository.save(transaction);
            return ResponseEntity.ok().body(transaction);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }
}
