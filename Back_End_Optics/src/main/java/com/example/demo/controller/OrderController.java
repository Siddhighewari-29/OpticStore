package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Order;
import com.example.demo.service.EmailService;
import com.example.demo.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;
    private final EmailService emailService;

    public OrderController(
            OrderService orderService,
            EmailService emailService
    ) {
        this.orderService = orderService;
        this.emailService = emailService;
    }

    // PLACE ORDER
    @PostMapping
    public ResponseEntity<Order> placeOrder(
            @RequestBody Order order
    ) {

        Order savedOrder = orderService.saveOrder(order);

        try {
            emailService.sendOrderConfirmationEmail(savedOrder);
            System.out.println("EMAIL SENT SUCCESSFULLY");
        } catch (Exception e) {
            System.out.println("EMAIL SENDING FAILED");
            e.printStackTrace();
        }

        return ResponseEntity.ok(savedOrder);
    }

    // GET USER ORDERS
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Order>> getUserOrders(
            @PathVariable String email
    ) {

        List<Order> orders =
                orderService.getOrdersByEmail(email);

        return ResponseEntity.ok(orders);
    }
}