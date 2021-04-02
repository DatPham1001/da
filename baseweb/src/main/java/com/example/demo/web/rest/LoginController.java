package com.example.demo.web.rest;


import com.example.demo.jwt.JwtService;
import com.example.demo.service.AccountService;
import com.example.demo.web.vm.LoginIM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginController {
    private final AccountService accountService;
    private final JwtService jwtService;
    @Autowired
    public LoginController(AccountService accountService, JwtService jwtService) {
        this.accountService = accountService;
        this.jwtService = jwtService;
    }

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody LoginIM user) {
        String result = "";
        try {
            if (accountService.checkLogin(user)) {
                result = jwtService.generateTokenLogin(user.getUsername());
                return ResponseEntity.ok().body(result);
            } else {
                result = "Wrong userId and password";
                return ResponseEntity.badRequest().body(result);
            }
        } catch (Exception ex) {
            result = "Server Error";
            return ResponseEntity.badRequest().body(result);
        }
    }
}
