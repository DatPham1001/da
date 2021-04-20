package com.example.demo.service;


import com.example.demo.entites.Contact;
import com.example.demo.repository.ContactRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.web.exception.NotFoundException;
import com.example.demo.web.vm.ContactOM;
import com.example.demo.web.vm.CreateContactIM;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ContactRepository contactRepository;
    private final JobRepository jobRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository, JobRepository jobRepository) {
        this.contactRepository = contactRepository;
        this.jobRepository = jobRepository;
    }

    ModelMapper modelMapper = new ModelMapper();

    public Contact create(CreateContactIM createContactIM) {
        Contact contact = new Contact();
        contact.setName(createContactIM.getName());
        contact.setPhone(createContactIM.getPhone());
        contact.setAddress(createContactIM.getAddress());
        contact.setEmail(createContactIM.getEmail());
        contact.setBod(createContactIM.getBod());
        contact.setMeetDate(createContactIM.getMeetDate());
        contact.setJobId(createContactIM.getJobId());
        contact.setCvUrl(createContactIM.getCvUrl());
        contact.setNote(createContactIM.getNote());
        contact.setExperience(createContactIM.getExperience());
        contactRepository.save(contact);
        return contact;
    }

    public Contact update(CreateContactIM createContactIM, Integer id) {
        Contact contact = contactRepository.getOne(id);
        if (contact == null) {
            throw new NotFoundException("Khong ton tai");
        } else {
            contact.setName(createContactIM.getName());
            contact.setPhone(createContactIM.getPhone());
            contact.setEmail(createContactIM.getEmail());
            contact.setAddress(createContactIM.getAddress());
            contact.setMeetDate(createContactIM.getMeetDate());
            contact.setNote(createContactIM.getNote());
            contact.setBod(createContactIM.getBod());
            contact.setJobId(createContactIM.getJobId());
            contact.setCvUrl(createContactIM.getCvUrl());
            contact.setExperience(createContactIM.getExperience());
        }
        contactRepository.save(contact);
        return contact;
    }

    public Contact delete(int id) {
        Contact contact = contactRepository.getOne(id);
        contact.setDeleted(true);
        contactRepository.save(contact);
        return contact;
    }

    public Contact getByID(int id) {
        return contactRepository.getOne(id);
    }

    public Page<ContactOM> filterContacts(String input, boolean blacklisted, Integer page, Integer limit) {
        Page<ContactOM> contacts = contactRepository.filterContact(input, blacklisted, PageRequest.of(page, limit));
        return contacts;
    }
}
