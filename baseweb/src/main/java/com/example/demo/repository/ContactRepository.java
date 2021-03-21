package com.example.demo.repository;


import com.example.demo.entites.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query(value = "SELECT * FROM thesis.contact a\n" +
            "where a.name like concat('%',upper(?1),'%')\n" +
            "or a.phone like concat('%',upper(?1),'%')\n" +
            "and a.blacklisted = ?2 \n" +
            "and a.deleted = false\n" +
            "order by a.last_modified DESC", nativeQuery = true)
    Page<Contact> filterContact(String input, boolean blacklisted, Pageable pageable);
}