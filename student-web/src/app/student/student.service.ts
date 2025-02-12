import { Student } from './student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  [x: string]: any;

  constructor(private _httpClient:HttpClient) { }

  baseUrl:String='http://localhost:8080/v1/students';

  fetchAllStudents():Observable<Student[]>{
    return this._httpClient.get<Student[]>(`${this.baseUrl}`);
  }

  createStudent(data:Student){
    console.log(data);
    return this._httpClient.post<Student>(`${this.baseUrl}`, data);
  }

  updateStudent(data:Student){
    console.log(data);
    return this._httpClient.put<Student>(`${this.baseUrl}/${data.studentId}`, data);
  }

  deleteStudent(studentId:Number){
    return this._httpClient.delete<Student>(`${this.baseUrl}/${studentId}`);
  }

  validateCpfExists(cpf: string): Observable<boolean> {
    return this._httpClient.get<Student[]>(`${this.baseUrl}`).pipe(
      map((students) => students.some(student => student.cpf === cpf))
    );
  }
  
  validateEmailExists(email: string): Observable<boolean> {
    return this._httpClient.get<Student[]>(`${this.baseUrl}`).pipe(
      map((students) => students.some(student => student.email === email))
    );
  }
}
