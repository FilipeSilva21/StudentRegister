import { createStudentComponent } from './../student-form/student-form.component';
import { updateStudentComponent } from './../student-changer/student-changer.component';
import { StudentService } from './../student.service';
import { Student } from './../student';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, FormsModule, MatDatepickerModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements AfterViewInit{

  displayedColumns = ['studentId', 'name', 'email', 'cpf', 'phone', 'birthday', 'edit'];
  dataSource = new MatTableDataSource<Student>();
  constructor(private studentService:StudentService){}

  studentId = null
  name: String = "";
  birthday: any = undefined;
  cpf: String = "";
  email: String = "";
  phone: String = "";


  student : Student = {
    studentId: null,
    name:"",
    email: "",
    birthday: this.birthday,
    phone: "",
    cpf: "",
  }

  students:Student[]=[];
  filteredStudents:Student[]=[];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  readonly dialog=inject(MatDialog);

  ngAfterViewInit(): void {
    this.getAllStudents();
  }

  getAllStudents(){
    this.studentService.fetchAllStudents().subscribe((data)=>{
      this.students=data;
      this.dataSource = new MatTableDataSource<Student>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  searchStudent(input:any){
    this.filteredStudents=this.students.filter(
        item => item.name.toLowerCase().includes(input.toLowerCase())
    ||  item.email.toLowerCase().includes(input.toLowerCase())
    ||  item.cpf.toString().includes(input));
    this.dataSource = new MatTableDataSource<Student>(this.filteredStudents);
  }

  createStudent(student: Student): void {

    const dialogRef = this.dialog.open(createStudentComponent, { data: student });

    dialogRef.afterClosed().subscribe(
        (result) => { this.getAllStudents()
          // if (result) {
          //   this.student.studentId = result.studentId;
          //   this.student.name = result.name;
          //   this.student.cpf = result.cpf;
          //   this.student.email = result.email;
          //   this.student.phone = result.phone;
          //   this.student.birthday = result.birthday;
          // }
        },
        (error) => {
          if (error.status === 400) {
            alert(error.error);
          }
        }
    );
  }

  updateStudent(student:Student): void {
    const dialogRef=this.dialog.open(updateStudentComponent, {data:student});

    dialogRef.afterClosed().subscribe(result => { this.getAllStudents()})
  }
}
