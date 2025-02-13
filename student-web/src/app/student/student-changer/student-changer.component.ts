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
import 'moment/locale/pt';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};

@Component({
  selector: 'app-student-changer',
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, MatDatepickerModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, provideMomentDateAdapter(MY_FORMATS) ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './student-changer.component.html',
  styleUrl: './student-changer.component.scss'
})

export class updateStudentComponent{
  readonly dialogRef=inject(MatDialogRef<updateStudentComponent>)
  data=inject<Student>(MAT_DIALOG_DATA);

  constructor(private studentService : StudentService){}

  updateStudentComponent(student:Student){
    this.studentService.updateStudent(student).subscribe({
      next: (data) => {
        console.log('Aluno atualizado com sucesso', data);
          this.dialogRef.close(true);
         window.location.reload(); 
      },
      error: (err) => {
        console.error('Erro ao atualizar aluno:', err);
        alert('Erro ao atualizar aluno. Verifique os dados e tente novamente.');
      }
    });
  }

  deleteStudentComponent(studentId:Number){
    const isConfirmed = window.confirm('Tem certeza quequer deletar este usuário?');
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

  validateEmail(data : any){
    if (!data.email.includes('@')) {
      alert('Email deve conter @');
      return false;
    } return true;
  }

  validatePhone(data: any){
    if (data.phone.length < 11) {
      alert('Insira um número de telefone válido');
      return false;
    } 
      return true; 
  }

  validateEmailExists(data: any) {
    this.studentService.validateCpfExists(data.email).subscribe((exists) => {
      if (exists) {
        alert('Email já cadastrado no sistema');
        return ;
      }
    }); return true;
  }

  refresh(): void {
    window.location.reload();
  }

  validateUser(data: any) {
    if (!this.validatePhone(data)) {
      return;
    }
    if (!this.validateEmail(data)) {
      return;
    }

    if (!this.validateEmailExists(data)) {
      return;
    }

    this.updateStudentComponent(data);
    this.refresh();
  }
}
