import { StudentService } from './../student.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Student } from '../student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-student-form',
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter(), [{provide: MAT_DATE_LOCALE, useValue: 'pt-br'}], ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})

export class createStudentComponent {
  readonly dialogRef=inject(MatDialogRef<createStudentComponent>);
  data=inject<Student>(MAT_DIALOG_DATA);

  constructor(private studentService:StudentService){}

  createStudent(student:Student){
    this.studentService.createStudent(student).subscribe({
      next:(data)=> {
        console.log('Aluno criado com sucesso', data);
        this.dialogRef.close(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  validateName(data: any) {
    console.log("Data received:", data);

    if (!data || !data.name) {
      alert("O nome é obrigatório!");
      return false;
    }

    if (data.name.length < 10) {
      alert("Usuário deve ter no mínimo 10 caracteres");
      return false;
    } 
    
    return true;
  }

  validateEmail(data : any){
  if (!data.email.includes('@')) {
    alert("Email deve conter @");
    return;
    } 
  }

  validateCpf(data: any){
  if (data.cpf.length < 11) {
    alert("Insira um número de CPF válido");
    return false;
    } 
    return true;
  }

  validatePhone(data: any){
  if (data.phone.length < 11) {
    alert("Insira um número de telefone válido");
    return false;
    } 
    return true; 
  }

  validateCpfExists(data: any) {
  this.studentService.validateCpfExists(data.cpf).subscribe((exists) => {
    if (exists) {
      alert('CPF já cadastrado no sistema');
    }
  });
}

  validateEmailExists(data: any) {
    this.studentService.validateCpfExists(data.email).subscribe((exists) => {
      if (exists) {
        alert('Email já cadastrado no sistema');
      }
    });
  }

  refresh(): void {
    window.location.reload();
}
}
