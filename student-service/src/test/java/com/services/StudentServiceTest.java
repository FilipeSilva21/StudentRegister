package com.services;

import com.DTOs.CreateStudentDTO;
import com.DTOs.UpdateStudentDTO;
import com.models.Student;
import com.repositories.StudentRepository;
import javassist.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student student;
    private CreateStudentDTO createStudentDTO;
    private UpdateStudentDTO updateStudentDTO;

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    Date birthday = dateFormat.parse("2000-01-01");
    StudentServiceTest() throws ParseException {
    }

    @BeforeEach
    void setUp() {
        student = new Student(null, "Filipe Silva", "filipe@email.com", birthday, "11987654321", "12345678901");
        createStudentDTO = new CreateStudentDTO("Filipe Silva", "filipe@email.com", birthday, "11987654321", "12345678901");
        updateStudentDTO = new UpdateStudentDTO("new.email@email.com", "11912345678");
    }

    @Test
    void shouldCreateStudentSuccessfully() {
        when(studentRepository.findByEmail(createStudentDTO.email())).thenReturn(Optional.empty());
        when(studentRepository.findByCpf(createStudentDTO.cpf())).thenReturn(Optional.empty());
        when(studentRepository.save(any(Student.class))).thenReturn(student);

        Long studentId = studentService.createStudent(createStudentDTO);
        assertEquals(student.getStudentId(), studentId);
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    void shouldNotCreateStudentIfEmailExists() {
        when(studentRepository.findByEmail(createStudentDTO.email())).thenReturn(Optional.of(student));

        Exception exception = assertThrows(IllegalArgumentException.class, () -> studentService.createStudent(createStudentDTO));
        assertEquals("Usuario com esse email ja cadastrado", exception.getMessage());
    }

    @Test
    void shouldReturnAllStudents() {
        when(studentRepository.findAll()).thenReturn(List.of(student));
        List<Student> students = studentService.getAllStudents();
        assertFalse(students.isEmpty());
        assertEquals(1, students.size());
    }

    @Test
    void shouldReturnStudentById() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        Optional<Student> foundStudent = studentService.getStudentById(1L);
        assertTrue(foundStudent.isPresent());
        assertEquals(student.getStudentId(), foundStudent.get().getStudentId());
    }

    @Test
    void shouldUpdateStudentSuccessfully() throws NotFoundException {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
        when(studentRepository.save(any(Student.class))).thenReturn(student);

        studentService.updateStudent(1L, updateStudentDTO);
        assertEquals(updateStudentDTO.email(), student.getEmail());
        assertEquals(updateStudentDTO.phone(), student.getPhone());
    }

    @Test
    void shouldThrowNotFoundExceptionWhenUpdatingNonExistentStudent() {
        when(studentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> studentService.updateStudent(99L, updateStudentDTO));
    }

    @Test
    void shouldDeleteStudentSuccessfully() throws Exception {
        when(studentRepository.existsById(1L)).thenReturn(true);
        doNothing().when(studentRepository).deleteById(1L);

        studentService.deleteStudent(1L);
        verify(studentRepository, times(1)).deleteById(1L);
    }

    @Test
    void shouldThrowNotFoundExceptionWhenDeletingNonExistentStudent() {
        when(studentRepository.existsById(99L)).thenReturn(false);
        assertThrows(NotFoundException.class, () -> studentService.deleteStudent(99L));
    }

    @Test
    void shouldSearchStudentByNameOrEmail() {
        when(studentRepository.findByNameContainingIgnoreCase("John")).thenReturn(List.of(student));
        List<Student> result = studentService.searchStudent("John");
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }
}

