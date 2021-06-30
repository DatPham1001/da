package com.example.demo.service;

import com.example.demo.entites.Job;
import com.example.demo.repository.JobRepository;
import com.example.demo.web.vm.CreateJobIm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job create(CreateJobIm createJobIm) {
        Job job = new Job();
        job.setName(createJobIm.getName());
        job.setDescription(createJobIm.getDescription());
        job.setRecuitmentStatus(true);
        jobRepository.save(job);
        return job;
    }

    public Job update(int id, CreateJobIm createJobIm) {
        Job job = jobRepository.getOne(id);
        job.setName(createJobIm.getName());
        job.setDescription(createJobIm.getDescription());
        job.setRecuitmentStatus(createJobIm.isRecruitmentStatus());
        jobRepository.save(job);
        return job;
    }

    public List<Job> getAll() {
        return jobRepository.findAllByRecuitmentStatus(true);
    }

    public Job getID(int id) {
        return jobRepository.getOne(id);
    }
}
