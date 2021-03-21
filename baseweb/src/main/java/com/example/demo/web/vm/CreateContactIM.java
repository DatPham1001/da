package com.example.demo.web.vm;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateContactIM {
    public String name;
    public String phone;
    public String email;
    public String address;
    public int responsibleBy;
    public Date bod;
    public Integer jobId;
    public Integer experience;
    public String cvUrl;
}
