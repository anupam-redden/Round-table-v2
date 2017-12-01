import { Component, OnInit } from '@angular/core';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Router } from '@angular/Router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  dateOptions: INgxMyDpOptions = {
    // other options...
    minYear: 1970,
    maxYear: (new Date()).getFullYear(),
    dateFormat: 'dd/mm/yyyy',
 };
  emp_frm:FormGroup;
  
  fname:string;
  lname:string;
  email:string;
  dob:string;
  address:string;
  user_type:string;
  gender:string;
  password:string;
  phone:string;
  user_type_list:any;
  constructor(private fb:FormBuilder,private empservice:EmployeeService,private router:Router) { 

    this.emp_frm=fb.group({
                            'fname':[null,Validators.compose([Validators.required,Validators.minLength(3)])],
                            'lname':[null,Validators.compose([Validators.required,Validators.minLength(3)])],
                            'email':[null,Validators.compose([Validators.required,Validators.email])],
                            'dob'  :[null,Validators.compose([Validators.required,Validators.maxLength(10)])],
                            'address':  [null,Validators.required],
                            'user_type':[null,Validators.required],
                            'password':[null,Validators.compose([Validators.required])],
                            'phone':[null,Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern(/^[0-9]+$/)])],
                            'gender':["male"], 
                         });
  }

  ngOnInit() {
    this.getUserType();
  }
  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.emp_frm.patchValue({dob: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
  }

  clearDate(): void {
      // Clear the date using the patchValue function
      this.emp_frm.patchValue({dob: null});
  }

  saveEmp(empData):void{
    this.fname=empData.fname;
    this.lname=empData.lname;
    this.email=empData.email;
    this.dob=empData.dob.formatted;
    this.address=empData.address;
    this.phone=empData.phone;
    this.password=empData.password;
    this.user_type=empData.user_type;
    const emp_json=JSON.stringify({
                                   fname:this.fname,
                                   lname:this.lname,
                                   email:this.email,
                                   dob:(this.dob),
                                   address:this.address,
                                   sex:this.gender,
                                   phone_no:this.phone,
                                   password:this.password,
                                   user_type:this.user_type
                                  });
    
    this.empservice.saveEmployee(emp_json)
                   .subscribe(data=>{
                          this.emp_frm.reset();
                          this.router.navigateByUrl("/epmloyee-list", { skipLocationChange: true });
                    });
    
  }

  getUserType(){

     this.empservice.getUserTypeList().subscribe(data=>{
          this.user_type_list=data; 
      })
  }
}
