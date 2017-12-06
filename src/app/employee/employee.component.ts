import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee-service'
import { Router } from '@angular/router';
import {User} from '../model/user'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  
  constructor(private employee:EmployeeService,private  router:Router) { }
  message:string="";
  ngOnInit() {
       
    this.employee.currentMessage.subscribe(message => {
                                                      
                                                           this.message = message 
                                                      })                 
                                                          
    if( typeof this.employee.emp_data==="undefined")                                                  
         this.getEmployeeList()                                                  
  }
  
  getEmployeeList():void{
    
         this.employee.getUserList()
  }
  
  deleteEmployee(id:any,i:any):void{
    if(confirm("Are you sure to delte?"))   
        this.employee.deleteEmp(id).subscribe(data=>{
        
            if(data==1){
              this.employee.sendMessage("Employee deleted successfully");
              this.employee.emp_data.splice(i,1);
            }
              
          
        })

  }
  

}
