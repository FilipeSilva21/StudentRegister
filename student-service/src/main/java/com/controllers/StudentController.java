package com.controllers;

import com.DTOs.CreateStudentDTO;
import com.DTOs.UpdateStudentDTO;
import com.models.Student;
import com.services.StudentService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<Long> createStudent(@RequestBody CreateStudentDTO createStudentDTO){

        var userId = studentService.createStudent(createStudentDTO);

        return ResponseEntity.created(URI.create("/v1/student/" + userId)).build();
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(){

        var users = studentService.getAllStudents();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<Student> updateStudent(@RequestBody UpdateStudentDTO updateStudentDTO,
                                                 @PathVariable ("studentId") Long studentId) throws NotFoundException {

        studentService.updateStudent(studentId, updateStudentDTO);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<Student> deleteStudent(@PathVariable ("studentId") Long studentId) throws Exception {

        studentService.deleteStudent(studentId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudent(@RequestParam String search){

        var students = studentService.searchStudent(search);

        return ResponseEntity.ok(students);
    }
}
