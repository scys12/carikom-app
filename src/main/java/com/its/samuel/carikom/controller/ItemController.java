package com.its.samuel.carikom.controller;

import com.its.samuel.carikom.model.Item;
import com.its.samuel.carikom.repository.ItemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ItemController {
    private ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        super();
        this.itemRepository = itemRepository;
    }

    @GetMapping("/items")
    Collection<Item> items() {
        return itemRepository.findAll();
        //select * from item
    }

    @GetMapping("/item/{id}")
    ResponseEntity<?> getItem(@PathVariable Long id) {
        Optional<Item> item = itemRepository.findById(id);
        return item.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/item/{userOwner}/{name}")
    ResponseEntity<?> getItemBasedOnItemName(@PathVariable Long userOwner, @PathVariable String name) {
        Optional<Item> item = itemRepository.findByName(name);
        return item.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/item/{userOwner}/{category}")
    ResponseEntity<?> getItemBasedOnCategory(@PathVariable Long userOwner, @PathVariable Long category) {
        Optional<Item> item = itemRepository.findByUserOwnerAndCategory(userOwner, category);
        return item.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/item")
    ResponseEntity<Item> createItem(@Valid @RequestBody Item item) throws URISyntaxException {
        Item itemResult = itemRepository.save(item);
        return ResponseEntity.created(new URI("/api/item" + itemResult.getId())).body(itemResult);
    }

    @PutMapping("/item/{id}")
    ResponseEntity<Item> updateItem(@Valid @RequestBody Item item) {
        Item itemResult = itemRepository.save(item);
        return ResponseEntity.ok().body(itemResult);
    }

    @DeleteMapping("/item/{id}")
    ResponseEntity<Item> deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }




}
