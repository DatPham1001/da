package com.example.demo.web.vm;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ContactDetailModel {
    public Integer id;
    public String name;
    public String phone;
    public String email;
    public String address;
    public Date bod;
    public int jobId;
    public String experience;
    public String cvUrl;
    public String meetDate;
    public Integer responsibleBy;
    public boolean blacklisted;
    public String note;
    public boolean deleted;
    public String jobName;
    public String status;
}
