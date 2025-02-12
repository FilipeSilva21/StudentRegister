package com.controllers;

import com.DTOs.CreateStudentDTO;
import com.DTOs.UpdateStudentDTO;
import com.models.Student;
import com.services.StudentService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<String> createStudent(@RequestBody CreateStudentDTO createStudentDTO) {

        try {
            studentService.createStudent(createStudentDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Aluno criado com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(){

        var users = studentService.getAllStudents();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<Student> updateStudent(@RequestBody UpdateStudentDTO updateStudentDTO,
                                                 @PathVariable ("studentId") Long studentId) throws NotFoundException {

        var studentExists= studentService.updateStudent(studentId, updateStudentDTO);

        return ResponseEntity.ok(studentExists);
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
