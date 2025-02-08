package com.repositories;

import com.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findById (Long userId);

    Optional<Student> findByEmail(String email);

    List<Student> findAllByEmail(String email);

    List<Student> findByNameContainingIgnoreCase(String name);

    List<Student> findByAge(int age);

}
