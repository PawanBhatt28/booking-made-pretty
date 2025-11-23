package com.tableflow.backend.controller;

import com.tableflow.backend.entity.Restaurant;
import com.tableflow.backend.repository.RestaurantRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // Get all restaurants
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    // Get restaurant by ID
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        return restaurant.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Add new restaurant (Super Admin)
    @PostMapping
    public ResponseEntity<Restaurant> addRestaurant(@Valid @RequestBody Restaurant restaurant) {
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRestaurant);
    }
}
