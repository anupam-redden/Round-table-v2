import { Component, OnInit } from '@angular/core';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Router } from '@angular/router';
import {User} from '../../model/user';

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
  sex:string;
  user_type_list:any;

  constructor(private fb:FormBuilder,private empservice:EmployeeService,private router:Router) { 

    this.emp_frm=fb.group({
                            'fname':[null,Validators.compose([Validators.required,Validators.minLength(3)])],
                            'lname':[null,Validators.compose([Validators.required,Validators.minLength(3)])],
                            'email':[null,Validators.compose([Validators.required,Validators.email]),this.isEmailUnique.bind(this)],
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

  isEmailUnique(control: FormControl){

    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.empservice.findUserByEmail(control.value).subscribe(data => {
          if(data.toString())
          resolve({ 'isEmailUnique': true })   
               
          else
          resolve(null);
        });
      }, 1000);
    });
    return q;
    
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
    this.sex=empData.gender;
    let user_info={
      fname:this.fname,
      lname:this.lname,
      email:this.email,
      dob:(this.dob),
      address:this.address,
      sex:this.sex,
      phone_no:this.phone,
      password:this.password,
      user_type:this.user_type
     };
    let auser:User=new User(user_info);
   
    user_info.password=this.password;
    const emp_json=JSON.stringify(user_info);
    
    this.empservice.saveEmployee(emp_json)
                   .subscribe(data=>{
                          this.emp_frm.reset();
                          this.empservice.sendMessage("Employee Added successfully")
                          this.empservice.emp_data.push(auser);
                          this.router.navigateByUrl("/epmloyee-list");
                    });
    
  }

  getUserType(){

     this.empservice.getUserTypeList().subscribe(data=>{
          this.user_type_list=data; 
      })
  }
}
