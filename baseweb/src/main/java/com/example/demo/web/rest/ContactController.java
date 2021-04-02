package com.example.demo.web.rest;


import com.example.demo.entites.Contact;
import com.example.demo.service.ContactService;
import com.example.demo.web.vm.CreateContactIM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
        Page<Contact> contacts = contactService.filterContacts(input.orElse(""), blacklisted.orElse(false), page.orElse(0), limit.orElse(5));
        return ResponseEntity.ok().body(contacts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContacts(@PathVariable int id) {
        Contact contact = contactService.delete(id);
        return ResponseEntity.ok().body(contact);
    }
}
