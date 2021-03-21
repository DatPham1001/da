package com.example.demo.entites;


import com.example.demo.enums.AccountTypeEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "Account")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Account extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id;
    public String name;
    public String phone;
    public String address;
    @Column(name = "account_type")
    public AccountTypeEnum accountType;
    @Column(unique = true)
    public String username;
    public String password;

    public static final class AccountBuilder {
        public Integer id;
        public String name;
        public String phone;
        public String address;
        public AccountTypeEnum accountType;
        public String username;
        public String password;

        private AccountBuilder() {
        }

        public static AccountBuilder anAccount() {
            return new AccountBuilder();
        }

        public AccountBuilder withId(Integer id) {
            this.id = id;
            return this;
        }

        public AccountBuilder withName(String name) {
            this.name = name;
            return this;
        }

        public AccountBuilder withPhone(String phone) {
            this.phone = phone;
            return this;
        }

        public AccountBuilder withAddress(String address) {
            this.address = address;
            return this;
        }

        public AccountBuilder withAccountType(AccountTypeEnum accountType) {
            this.accountType = accountType;
            return this;
        }

        public AccountBuilder withUsername(String username) {
            this.username = username;
            return this;
        }

        public AccountBuilder withPassword(String password) {
            this.password = password;
            return this;
        }

        public Account build() {
            Account account = new Account();
            account.setId(id);
            account.setName(name);
            account.setPhone(phone);
            account.setAddress(address);
            account.setAccountType(accountType);
            account.setUsername(username);
            account.setPassword(password);
            return account;
        }
    }
}
