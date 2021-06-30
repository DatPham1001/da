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
    @Temporal(TemporalType.TIMESTAMP)
    public Date bod;
    @Column(name = "job_id")
    public int jobId;
    public String experience;
    @Column(name = "cv_url")
    public String cvUrl;
    @Column(name = "meet_date")
    public String meetDate;
    @Column(name = "responsible_by")
    public Integer responsibleBy;
    @Column(name = "blacklisted")
    public boolean blacklisted;
    public String note;
    public String stage;
    public boolean deleted;
    @Column(name = "takecare_status")
    public String takeCareStatus;
}
