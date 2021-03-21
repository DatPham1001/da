package com.example.demo.web.vm;

import com.example.demo.enums.AccountTypeEnum;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreateAccountIM {
    public String name;
    public String phone;
    public String address;
    public AccountTypeEnum accountType;
    public String username;
    public String password;
}
