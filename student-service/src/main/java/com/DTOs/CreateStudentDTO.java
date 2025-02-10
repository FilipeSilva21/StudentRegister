package com.DTOs;

import java.util.Date;

public record CreateStudentDTO(String name, String email, Date birthday, String phone, String cpf){
}
