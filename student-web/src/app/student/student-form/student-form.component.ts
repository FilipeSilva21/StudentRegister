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

@Component({
  selector: 'app-student-form',
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
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
  closeWindowCreate() {
  }
}
