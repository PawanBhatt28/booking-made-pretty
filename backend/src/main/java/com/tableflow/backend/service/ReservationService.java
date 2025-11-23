package com.tableflow.backend.service;

import com.tableflow.backend.entity.Reservation;
import com.tableflow.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    public Reservation createReservation(Reservation reservation) {
        return repository.save(reservation);
    }

    public Reservation updateStatus(Long id, String status) {
        return repository.findById(id).map(reservation -> {
            reservation.setStatus(status);
            return repository.save(reservation);
        }).orElse(null);
    }
}
