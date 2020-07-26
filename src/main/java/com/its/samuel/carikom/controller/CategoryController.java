package com.its.samuel.carikom.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.its.samuel.carikom.model.Category;
import com.its.samuel.carikom.repository.CategoryRepository;
import com.its.samuel.carikom.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/categories")
    ArrayList categories(){
        List<Long> totalCategory = new ArrayList();
        List<Category> categories = categoryRepository.findAll();
        ArrayList totalElement = new ArrayList();
        categories.stream().forEach(category -> {
            totalCategory.add(itemRepository.countByCategoryIdAndIsBought(category.getId(), 0));
        });
        totalElement.add(categories);
        totalElement.add(totalCategory);
        return totalElement;
    }
}
