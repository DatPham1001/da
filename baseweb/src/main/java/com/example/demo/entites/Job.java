package com.example.demo.entites;


import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "job")
@Getter
@Setter
public class Job extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id;
    @NonNull
    public String name;
    public String description;
    @Column(name = "recuitment_status")
    public boolean recuitmentStatus;
}
