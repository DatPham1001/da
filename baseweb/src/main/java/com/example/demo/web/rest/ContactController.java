package com.example.demo.web.rest;


import com.example.demo.entites.Contact;
import com.example.demo.service.ContactService;
import com.example.demo.web.vm.ContactOM;
import com.example.demo.web.vm.CreateContactIM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin
@Controller
@RequestMapping("/api/contact")

public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody CreateContactIM createContactIM) {
        Contact contact = contactService.create(createContactIM);
        return ResponseEntity.ok().body(contact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody CreateContactIM createContactIM, @PathVariable int id) {
        Contact contact = contactService.update(createContactIM, id);
        return ResponseEntity.ok().body(contact);
    }

    @GetMapping()
    public ResponseEntity<?> getContacts(@RequestParam Optional<String> input,
                                         @RequestParam Optional<Boolean> blacklisted,
                                         @RequestParam Optional<Integer> page,
                                         @RequestParam Optional<Integer> limit) {
        Page<ContactOM> contacts = contactService.filterContacts(input.orElse(""), blacklisted.orElse(false), page.orElse(0), limit.orElse(5));
        return ResponseEntity.ok().body(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getId(@PathVariable int id) {
        return ResponseEntity.ok().body(contactService.getByID(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContacts(@PathVariable int id) {
        Contact contact = contactService.delete(id);
        return ResponseEntity.ok().body(contact);
    }
}
