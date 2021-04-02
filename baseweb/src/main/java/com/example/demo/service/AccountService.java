package com.example.demo.service;


import com.example.demo.entites.Account;
import com.example.demo.repository.AccountRepository;
import com.example.demo.web.exception.NotFoundException;
import com.example.demo.web.exception.ResponseException;
import com.example.demo.web.vm.CreateAccountIM;
import com.example.demo.web.vm.LoginIM;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public ResponseEntity<?> createAccount(CreateAccountIM createAccountIM) {
        ResponseException responseException;
        Account validate = null;
        if(createAccountIM.getUsername() != null) {
            validate = accountRepository.findByUsername(createAccountIM.getUsername());
            if (validate != null) {
                responseException = new ResponseException(400);
                responseException.addError("username", "exist",
                        "Tài khoản đã tồn tại");
                return ResponseEntity.status(responseException.getStatus()).body(responseException);
            }
        }
        Account account = new Account();
        account.setName(createAccountIM.getName());
        account.setPhone(createAccountIM.getPhone());
        account.setAddress(createAccountIM.getAddress());
//        if(createAccountIM.getUsername() && createAccountIM.getPassword())
        account.setUsername(createAccountIM.getUsername());
        if(createAccountIM.getPassword() != null){
            String password = BCrypt.hashpw(createAccountIM.getPassword(),BCrypt.gensalt(4));
            account.setPassword(password);
        }
        account.setAccountType(createAccountIM.getAccountType());
        accountRepository.save(account);
        return ResponseEntity.ok().body(account);
    }

    public ResponseEntity updateAccount(CreateAccountIM createAccountIM, int id) {
        Account oldAccount = accountRepository.findById(id).get();
        ResponseException responseException;
        Account validateUsername = null;
        if(createAccountIM.getUsername() != null) {
            validateUsername = accountRepository.findByUsername(createAccountIM.getUsername());
            if (validateUsername != null) {
                responseException = new ResponseException(400);
                responseException.addError("username", "exist",
                        "Tài khoản đã tồn tại");
                return ResponseEntity.status(responseException.getStatus()).body(responseException);
            }
        }else {
            oldAccount.setName(createAccountIM.getName());
            oldAccount.setPhone(createAccountIM.getPhone());
            oldAccount.setAddress(createAccountIM.getAddress());
            oldAccount.setUsername(createAccountIM.getUsername());
            if(createAccountIM.getPassword() != null){
                String password = BCrypt.hashpw(createAccountIM.getPassword(),BCrypt.gensalt(4));
                oldAccount.setPassword(password);
            }
            oldAccount.setAccountType(createAccountIM.getAccountType());
        }
        accountRepository.save(oldAccount);
        return ResponseEntity.ok().body(oldAccount);
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
    public Account loadByUserName(String username){
        return accountRepository.findByUsername(username);
    }
    public boolean checkLogin(LoginIM loginIM){
        Account account = accountRepository.findByUsername(loginIM.getUsername());
        if (account != null){
                boolean validate = BCrypt.checkpw(loginIM.getPassword(),account.getPassword());
                return validate;
        }
        return false;
    }

}
