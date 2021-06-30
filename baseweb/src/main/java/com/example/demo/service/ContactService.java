package com.example.demo.service;


import com.example.demo.entites.Contact;
import com.example.demo.entites.Job;
import com.example.demo.repository.ContactRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.web.exception.NotFoundException;
import com.example.demo.web.vm.ContactDetailModel;
import com.example.demo.web.vm.ContactOM;
import com.example.demo.web.vm.CreateContactIM;
import com.google.gson.Gson;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class ContactService {
    private final ContactRepository contactRepository;
    private final JobRepository jobRepository;
    private static Gson gson = new Gson();

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
        contact.setTakeCareStatus(createContactIM.getTakecareStatus());
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

    public ContactDetailModel getByID(int id) {
        Contact contact = contactRepository.findById(id).get();
        Job job = jobRepository.getOne(contact.getJobId());
        SimpleDateFormat dateFormat = new SimpleDateFormat();
//        ContactDetailModel contactDetailModel = new ContactDetailModel();
        ContactDetailModel contactDetailModel = new ContactDetailModel();
        if (job.getName() == null || job.getName().isEmpty())
            contactDetailModel.setJobName("None");
        else contactDetailModel.setJobName(job.getName());
        contactDetailModel.setAddress(contact.getAddress());
        contactDetailModel.setId(contact.getId());
        contactDetailModel.setName(contact.getName());
        contactDetailModel.setPhone(contact.getPhone());
        contactDetailModel.setEmail(contact.getEmail());
        contactDetailModel.setExperience(contact.getExperience());
        contactDetailModel.setCvUrl(contact.getCvUrl());
//        contactDetailModel.setResponsibleBy();
        contactDetailModel.setNote(contact.getNote());
        contactDetailModel.setMeetDate(contact.getMeetDate());
        contactDetailModel.setBod(contact.getBod());
        contactDetailModel.setStatus(contact.getTakeCareStatus());
        return contactDetailModel;
    }

    public List<ContactOM> filterContacts(String input, boolean blacklisted, Integer page, Integer limit) {
        List<ContactOM> contacts = contactRepository.filterContact(input, blacklisted);
        return contacts;
    }

}
