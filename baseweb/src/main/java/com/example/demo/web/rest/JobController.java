package com.example.demo.web.rest;


import com.example.demo.service.JobService;
import com.example.demo.web.vm.CreateJobIm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/job")
public class JobController {
    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateJobIm createJobIm) {
        return ResponseEntity.ok().body(jobService.create(createJobIm));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody CreateJobIm createJobIm, @PathVariable Integer id) {
        return ResponseEntity.ok().body(jobService.update(id, createJobIm));
    }

    @GetMapping()
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(jobService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        return ResponseEntity.ok().body(jobService.getID(id));
    }
}
