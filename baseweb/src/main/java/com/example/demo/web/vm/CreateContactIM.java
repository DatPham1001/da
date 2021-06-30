package com.example.demo.web.vm;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class  CreateContactIM {
    public Integer id;
    public String name;
    public String phone;
    public String email;
    public String address;
    public Integer responsibleBy;
    public Date bod;
    public String meetDate;
    public Integer jobId;
    public String experience;
    public String status;
    public String cvUrl;
    public String note;
    public String takecareStatus;
    public Boolean blacklisted;
    public Boolean deleted;


}
