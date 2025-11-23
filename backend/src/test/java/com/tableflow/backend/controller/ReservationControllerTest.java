package com.tableflow.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tableflow.backend.entity.Reservation;
import com.tableflow.backend.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReservationController.class)
public class ReservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReservationService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateReservation_Success() throws Exception {
        Reservation r = new Reservation();
        r.setName("John Doe");
        r.setPhone("1234567890");
        r.setDate("2023-12-25");
        r.setTime("19:00");
        r.setGuests(2);
        r.setRestaurantName("Test Resto");

        when(service.createReservation(any(Reservation.class))).thenReturn(r);

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(r)))
                .andExpect(status().isOk());
    }

    @Test
    public void testCreateReservation_ValidationFailure() throws Exception {
        Reservation r = new Reservation();
        // Missing required fields

        mockMvc.perform(post("/api/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(r)))
                .andExpect(status().isBadRequest());
    }
}
