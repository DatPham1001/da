package com.example.demo.repository;


import com.example.demo.entites.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query(value = "SELECT * FROM thesis.account a\n" +
            "where a.name like concat('%',upper(?1),'%')\n" +
            "or a.phone like concat('%',upper(?1),'%') \n" +
            "order by a.last_modified DESC", nativeQuery = true)
    Page<Account> filterAccounts(String input, Pageable pageable);

    Account findByUsername(String username);
}
