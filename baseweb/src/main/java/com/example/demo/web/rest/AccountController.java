package com.example.demo.web.rest;


import com.example.demo.entites.Account;
import com.example.demo.service.AccountService;
import com.example.demo.web.vm.CreateAccountIM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/account")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody CreateAccountIM createAccountIM) {
        return  accountService.createAccount(createAccountIM);
    }

    @GetMapping
    public ResponseEntity<?> filterAccounts(@RequestParam Optional<String> input,
                                            @RequestParam Optional<Integer> page,
                                            @RequestParam Optional<Integer> limit) {
        Page<Account> accounts = accountService.getAccounts(input.orElse(""), page.orElse(0), limit.orElse(5));
        return ResponseEntity.ok().body(accounts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        return ResponseEntity.ok().body(accountService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody CreateAccountIM createAccountIM, @PathVariable Integer id) {
        return accountService.updateAccount(createAccountIM, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer id) {
        accountService.deleteAccount(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
