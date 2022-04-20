import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;

  //in the constructor we make HttpClient because later we want that client
  //to call the api from spring boot app that will give us all the employees
  constructor(private http: HttpClient) { }


  //get all employees
  public getEmployees(): Observable<Employee[]>{
    const  data  =  this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    return data;
  }

   //add employee
   public addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`,employee);
  }

   //update employee
   public updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`,employee);
  }

  //delete employee
  public deleteEmployee(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }


}
