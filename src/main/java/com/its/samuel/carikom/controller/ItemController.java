package com.its.samuel.carikom.controller;

import com.its.samuel.carikom.model.Category;
import com.its.samuel.carikom.model.Item;
import com.its.samuel.carikom.model.User;
import com.its.samuel.carikom.payload.response.MessageResponse;
import com.its.samuel.carikom.repository.CategoryRepository;
import com.its.samuel.carikom.repository.ItemRepository;
import com.its.samuel.carikom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/items")
    Page<Item> items(Pageable pageable) {
        return itemRepository.findByIsBought(0, pageable);
    }

    @GetMapping("/item/{id}")
    ResponseEntity<?> getItem(@PathVariable Long id) {
        Optional<Item> item = itemRepository.findById(id);
        return item.map(response -> ResponseEntity.ok().body(response))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produk tidak ditemukan"));
    }

    @GetMapping("/category/item/{categoryId}")
    Page<Item> getItemsBasedOnCategory(@PathVariable Long categoryId, Pageable pageable) {
        return itemRepository.findByCategoryIdAndIsBought(categoryId, 0, pageable);
    }

    @GetMapping("/item/user/{userId}")
    Page<Item> getItemBasedOnUserOwner(@PathVariable(value = "userId") Long userId, Pageable pageable, Principal principal) {
        Optional<User> currentUser = userRepository.findByUsername(principal.getName());
        return currentUser.map(user -> {
            if (user.getId() == userId) return itemRepository.findByUserId(userId, pageable);
            else return itemRepository.findByUserIdAndIsBought(userId, 0, pageable);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/item")
    Item createItem(@Valid @RequestBody Item item, Principal principal) throws URISyntaxException {
        Optional<User> userItem = userRepository.findByUsername(principal.getName());
        return userItem.map( user -> {
            item.setUser(user);
            return itemRepository.save(item);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/item/edit")
    Item updateItem(@Valid @RequestBody Item item,Principal principal) {
        Optional<User> userItem = userRepository.findByUsername(principal.getName());
        return userItem.map( user -> {
            if (item.getUser().getId() != user.getId()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produk tidak dapat diedit");
            item.setUser(user);
            return itemRepository.save(item);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pengguna tidak ditemukan"));
    }

    @DeleteMapping("/item/delete/{id}")
    ResponseEntity<Item> deleteItem(@PathVariable Long id, Principal principal) {
        Optional<User> userItem = userRepository.findByUsername(principal.getName());
        Optional<Item> itemToDelete = itemRepository.findById(id);
        userItem.map(user -> {
            return itemToDelete.map( item -> {
                if (item.getUser().getId() != user.getId()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produk tidak dapat dihapus");
                return item;
            }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produk tidak ditemukan"));
        }).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User tidak ditemukan"));
        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/latestitem")
    List<Item> getLatestItem(Pageable pageable){
        List<Item> items = itemRepository.findByIsBoughtOrderByIdDesc();
        return items;
    }

    @GetMapping("/user/{id}/search")
    Page<Item> searchUserItem(@PathVariable Long id, @RequestParam Long type, @RequestParam String searchWord, Pageable pageable){
        if (type == 0){
            return itemRepository.findByUserIdAndNameContainingAndIsBought(id, searchWord, 0, pageable);
        }else if(type > 0 && type < 6){
            return itemRepository.findByUserIdAndNameContainingAndIsBoughtAndCategoryId(id, searchWord, 0, type, pageable);
        }else throw new  ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}