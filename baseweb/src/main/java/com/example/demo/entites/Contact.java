package com.example.demo.entites;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "contact")
@Getter
@Setter
public class Contact extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id;
    public String name;
    public String phone;
    public String email;
    public String address;
    public Date bod;
    @Column(name = "job_id")
    public Integer jobId;
    public Integer experience;
    @Column(name = "cv_url")
    public String cvUrl;
    @Column(name = "responsible_by")
    public Integer responsibleBy;
    @Column(name = "blacklisted")
    public boolean blacklisted;
    public boolean deleted;
}
