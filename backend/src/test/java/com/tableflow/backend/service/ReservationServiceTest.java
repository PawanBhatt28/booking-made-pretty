package com.tableflow.backend.service;

import com.tableflow.backend.entity.Reservation;
import com.tableflow.backend.repository.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock
    private ReservationRepository repository;

    @InjectMocks
    private ReservationService service;

    @Test
    public void testGetAllReservations() {
        Reservation r1 = new Reservation();
        r1.setId(1L);
        Reservation r2 = new Reservation();
        r2.setId(2L);

        when(repository.findAll()).thenReturn(Arrays.asList(r1, r2));

        List<Reservation> result = service.getAllReservations();
        assertEquals(2, result.size());
    }

    @Test
    public void testCreateReservation() {
        Reservation r = new Reservation();
        r.setName("Test");

        when(repository.save(any(Reservation.class))).thenReturn(r);

        Reservation result = service.createReservation(r);
        assertNotNull(result);
        assertEquals("Test", result.getName());
    }

    @Test
    public void testUpdateStatus() {
        Reservation r = new Reservation();
        r.setId(1L);
        r.setStatus("pending");

        when(repository.findById(1L)).thenReturn(Optional.of(r));
        when(repository.save(any(Reservation.class))).thenReturn(r);

        Reservation result = service.updateStatus(1L, "confirmed");
        assertEquals("confirmed", result.getStatus());
    }
}
