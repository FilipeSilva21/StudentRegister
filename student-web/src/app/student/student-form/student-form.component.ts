import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  data=inject<Student>(MAT_DIALOG_DATA);

  constructor(private studentService:StudentService, dialogRef: MatDialogRef<createStudentComponent>){}

  createStudent(student:Student){
    this.studentService.createStudent(student).subscribe({
      next:(data)=> {
        console.log('Aluno criado com sucesso');
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  validateItems(data: any) {

    if (!data || !data.name) {
      alert("O nome é obrigatório!");
      return;
    }

    if (data.name.length < 10) {
      alert("Usuário deve ter no mínimo 10 caracteres");
    }

    if(!data.email.contains('@')){
      alert("Email deve ter no @");
    }

    if (data.name.phone < 10) {
      alert("Telefone deve ter no mínimo 11 digitos");
    }

    if (data.cpf.length < 10) {
      alert("Usuário deve ter no mínimo 10 caracteres");
    }
  }

  //fazer a verificacao de cpf e email ja existente
}
