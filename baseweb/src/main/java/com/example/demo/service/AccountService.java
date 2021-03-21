package com.example.demo.service;


import com.example.demo.entites.Account;
import com.example.demo.repository.AccountRepository;
import com.example.demo.web.exception.NotFoundException;
import com.example.demo.web.vm.CreateAccountIM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(CreateAccountIM createAccountIM) {
        Account account = new Account();
        account.setName(createAccountIM.getName());
        account.setPhone(createAccountIM.getPhone());
        account.setAddress(createAccountIM.getAddress());
//        if(createAccountIM.getUsername() && createAccountIM.getPassword())
        account.setUsername(createAccountIM.getUsername());
        account.setPassword(createAccountIM.getPassword());
        account.setAccountType(createAccountIM.getAccountType());
        accountRepository.save(account);
        return account;
    }

    public Account updateAccount(CreateAccountIM createAccountIM, int id) {
        Account oldAccount = accountRepository.findById(id).get();
        if (oldAccount == null) {
            throw new NotFoundException("No account exist");
        } else {
            oldAccount.setName(createAccountIM.getName());
            oldAccount.setPhone(createAccountIM.getPhone());
            oldAccount.setAddress(createAccountIM.getAddress());
            oldAccount.setUsername(createAccountIM.getUsername());
            oldAccount.setPassword(createAccountIM.getPassword());
            oldAccount.setAccountType(createAccountIM.getAccountType());
        }
        accountRepository.save(oldAccount);
        return oldAccount;
    }

    public Page<Account> getAccounts(String input, Integer page, Integer limit) {
        Page<Account> accounts = accountRepository.filterAccounts(input, PageRequest.of(page, limit));
        return accounts;
    }

    public Account getById(int id) {
        return accountRepository.findById(id).get();
    }

    public String deleteAccount(int id) {
        accountRepository.deleteById(id);
        return "OK";
    }

}
