import { Student } from './../student';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogModule, MatDialogTitle, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-changer',
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, MatDatepickerModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter(), [{provide: MAT_DATE_LOCALE, useValue: 'pt-br'}], ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './student-changer.component.html',
  styleUrl: './student-changer.component.scss'
})

export class updateStudentComponent{
  readonly dialogRef=inject(MatDialogRef<updateStudentComponent>)
  data=inject<Student>(MAT_DIALOG_DATA);

  constructor(private studentService:StudentService){}

  updateStudentComponent(student:Student){
    console.log(student);
    this.studentService.updateStudent(student).subscribe({
      next:(data)=> {
        console.log('Aluno atualizado com sucesso');
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  deleteStudentComponent(studentId:Number){
    const isConfirmed = window.confirm("Tem certeza quequer deletar este usuário?");
      if(isConfirmed){
        this.studentService.deleteStudent(studentId!).subscribe({
          next:(data)=> {
            console.log('Aluno deletado com sucesso');
            this.dialogRef.close(true);
          },
          error:(err)=>{
            console.log(err);
          }
        })
        window.location.reload();
      }
  }

  closeWindowUpdate(): void {
    this.dialogRef.close();
  }
}
