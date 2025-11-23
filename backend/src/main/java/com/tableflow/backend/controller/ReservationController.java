package com.tableflow.backend.controller;

import com.tableflow.backend.entity.Reservation;
import com.tableflow.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" }) // Allow Vite frontend
public class ReservationController {

    @Autowired
    private ReservationService service;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return service.getAllReservations();
    }

    @PostMapping
    public org.springframework.http.ResponseEntity<Reservation> createReservation(
            @jakarta.validation.Valid @RequestBody Reservation reservation) {
        return org.springframework.http.ResponseEntity.ok(service.createReservation(reservation));
    }

    @PutMapping("/{id}/status")
    public org.springframework.http.ResponseEntity<Reservation> updateStatus(@PathVariable Long id,
            @RequestBody String status) {
        String cleanStatus = status.replace("\"", "");
        Reservation updated = service.updateStatus(id, cleanStatus);
        if (updated != null) {
            return org.springframework.http.ResponseEntity.ok(updated);
        }
        return org.springframework.http.ResponseEntity.notFound().build();
    }
}
