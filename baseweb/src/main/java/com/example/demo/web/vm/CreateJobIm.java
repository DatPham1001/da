package com.example.demo.web.vm;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class CreateJobIm {
    public String name;
    public String description;
    public boolean recruitmentStatus;
}
