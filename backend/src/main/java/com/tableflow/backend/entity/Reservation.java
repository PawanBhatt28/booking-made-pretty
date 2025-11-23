package com.tableflow.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @jakarta.validation.constraints.NotBlank(message = "Name is required")
    private String name;

    @jakarta.validation.constraints.NotBlank(message = "Phone number is required")
    @jakarta.validation.constraints.Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @jakarta.validation.constraints.NotBlank(message = "Date is required")
    private String date;

    @jakarta.validation.constraints.NotBlank(message = "Time is required")
    private String time;

    @jakarta.validation.constraints.Min(value = 1, message = "Guests must be at least 1")
    private int guests;

    private String specialRequest;

    private String status; // pending, confirmed, cancelled

    @jakarta.validation.constraints.NotBlank(message = "Restaurant name is required")
    private String restaurantName;

    private LocalDateTime createdAt;

    public Reservation() {
        this.createdAt = LocalDateTime.now();
        this.status = "pending";
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
