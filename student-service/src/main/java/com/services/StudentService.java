package com.services;

import com.DTOs.CreateStudentDTO;
import com.DTOs.UpdateStudentDTO;
import com.models.Student;
import com.repositories.StudentRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Long createStudent(CreateStudentDTO createStudentDTO){

        var student = new Student(
            null,
            createStudentDTO.name(),
            createStudentDTO.email(),
            createStudentDTO.birthday(),
            createStudentDTO.phone(),
            createStudentDTO.cpf()
        );

        if(studentRepository.findByEmail(createStudentDTO.email()).isPresent()){
            throw new IllegalArgumentException("Usuario com esse email ja cadastrado");
        }
        if(studentRepository.findByCpf(createStudentDTO.cpf()).isPresent()){
            throw new IllegalArgumentException("Usuario com esse cpf ja cadastrado");
        }
        if(createStudentDTO.name().length() < 10){
            throw new IllegalArgumentException("Nome do usuario deve ter no minimo 10 caracteres");
        }
        if (!createStudentDTO.email().contains("@")){
            throw new IllegalArgumentException("Usuario de email não é valido pos deve conter '@'");
        }
        if(createStudentDTO.phone().length() < 11){
            throw new IllegalArgumentException("Telefone do usuario deve ter no minimo 11 caracteres");
        }
        if(createStudentDTO.cpf().length() < 11){
            throw new IllegalArgumentException("Cpf do usuario deve ter no minimo 10 caracteres");
        }

        var studentSaved = studentRepository.save(student);

        return studentSaved.getStudentId();
    }

    public List<Student> getAllStudents(){

        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long userId){

        return studentRepository.findById(userId);
    }

    public void updateStudent(Long studentId, UpdateStudentDTO updateUserDTO) throws NotFoundException {

        var studentEntity = studentRepository.findById(studentId);

        if (studentEntity.isPresent()) {
            var student = studentEntity.get();

            if (updateUserDTO.phone() != null) {
                student.setPhone(updateUserDTO.phone());
            }
            if (updateUserDTO.email() != null) {
                student.setEmail(updateUserDTO.email());
            }

            studentRepository.save(student);
            System.out.println("Usuario atualizado com sucesso");

        } else{
            throw new NotFoundException("Usuario nao encontrado");
        }

    }

    public void deleteStudent(Long studentId) throws Exception {

        var studentExists = studentRepository.existsById(studentId);

        if (studentExists) {
            studentRepository.deleteById(studentId);
        } else {
            throw new NotFoundException("Usuario nao encontrado");
        }
    }

    public List<Student> searchStudent(String search) {
        List<Student> result = studentRepository.findByNameContainingIgnoreCase(search);
        if (result.isEmpty()) {
            result = studentRepository.findAllByEmail(search);
        }
        return result;
    }
}
