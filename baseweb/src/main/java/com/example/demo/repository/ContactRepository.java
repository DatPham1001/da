package com.example.demo.repository;


import com.example.demo.entites.Contact;
import com.example.demo.web.vm.ContactOM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query(value = "SELECT a.id,a.meet_date meetDate,a.name,phone,email,address,bod,job_id as job_id," +
            "j.name as jobName,experience,cv_url as cvUrl,responsible_by as responsibleBy,a.note as note\n" +
            " FROM contact a left join job j on a.job_id = j.id\n" +
            "            where a.name like concat('%',upper(?1),'%')\n" +
            "            or a.phone like concat('%',upper(?1),'%')\n" +
            "            and a.blacklisted = ?2\n" +
            "            and a.deleted = false\n" +
            "            order by a.last_modified DESC", nativeQuery = true)
//    Page<ContactOM> filterContact(String input, boolean blacklisted, Pageable pageable);
    List<ContactOM> filterContact(String input, boolean blacklisted);
}
