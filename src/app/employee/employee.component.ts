import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee-service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  public emp_data:any;
  constructor(private employee:EmployeeService,private  router:Router) { }

  ngOnInit() {

    this.getEmployeeList()
  }
  
  getEmployeeList():void{

    this.employee.getUserList().subscribe(data=>{
      
      this.emp_data=data
      
    })
  }

}
