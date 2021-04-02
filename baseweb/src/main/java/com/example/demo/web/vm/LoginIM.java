package com.example.demo.web.vm;


import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.springframework.stereotype.Component;

@Getter
@Setter
public class LoginIM {
    public String username;
    public String password;
}
