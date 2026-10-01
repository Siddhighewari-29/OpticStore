package com.example.demo.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Order;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOrderConfirmationEmail(Order order) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(order.getEmail());
        message.setSubject("OpticStore - Order Confirmed");

        String emailBody =
                "Hello " + order.getFullName() + ",\n\n"
                + "Thank you for shopping with OpticStore!\n\n"
                + "Your order has been successfully confirmed.\n\n"
                + "Order ID: " + order.getId() + "\n"
                + "Payment Method: " + order.getPaymentMethod() + "\n"
                + "Subtotal: ₹" + order.getSubtotal() + "\n"
                + "Delivery: ₹" + order.getDelivery() + "\n"
                + "Total Amount: ₹" + order.getTotal() + "\n"
                + "Status: " + order.getStatus() + "\n\n"
                + "We will process your order shortly.\n\n"
                + "Thank you,\n"
                + "OpticStore Team";

        message.setText(emailBody);

        mailSender.send(message);
    }
}