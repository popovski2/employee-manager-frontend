import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //it will be used in the html file that's why is public
  //it will be used in the html file that's why is public
  public employees: Employee[]=[];

 constructor(private employeeService: EmployeeService) { }
  
 //od interfaceot so go implementirame
 ngOnInit(): void {
    this.getEmployees();
    console.log("employees = " + this.employees);
  }

 //get  employees ja povikuvat od servisot i bidejki vrakjat Observable
 //pravime subscribe bidejki mozebi ke mu trebit pojke vreme poso e preku network
 //t.e gi zemat od spring boot applikacijata
 public getEmployees(): void{
  this.employeeService.getEmployees().subscribe(
    //ako gi zemit stavi gi vo employees
    (response:Employee[]) =>{
      this.employees=response;
      console.log("imat employees " + this.employees[0].name);
      
    },
    //ako imat nekakov error prikazi error alert
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
  );

 }

 //open modal on front
 //we do not show the button because we have them already on the html bootstrap
 public onOpenModal(employee:Employee, mode:string) : void {

  const container = document.getElementById('main-container');
  const button = document.createElement('button');

  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle','modal');

  //mode is either add,edit or delete
  if(mode==='add'){
    button.setAttribute('data-target','#addEmployeeModal');
  }
  if(mode==='edit'){
    button.setAttribute('data-target','#updateEmployeeModal');
  }
  if(mode==='delete'){
    button.setAttribute('data-target','#deleteEmployeeModal');
  }

  //now we append the button somewhere on the container
  container?.appendChild(button);
  button.click();


 }


}
