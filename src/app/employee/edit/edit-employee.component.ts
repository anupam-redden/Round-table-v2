import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee-service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {User} from '../../model/user'
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private fb:FormBuilder,private empservice:EmployeeService,private  router:Router,private route:ActivatedRoute) { 

    this.emp_frm=fb.group({
      'index':[''],
      'fname':[null,Validators.compose([Validators.required,Validators.minLength(3)])],
      'lname':[null,Validators.compose([Validators.required,Validators.minLength(3)])],
      'email':[null,Validators.compose([Validators.required,Validators.email])],
      'dob'  :[null,Validators.compose([Validators.required,Validators.maxLength(10)])],
      'address':  [null,Validators.required],
      'user_type':[null,Validators.required],
      'phone':[null,Validators.compose([Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]+$/)])],
      'gender':["male"], 
   });


  }

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

  ngOnInit() {
        this.route.params.subscribe(params=>{
                this.getEmployee(params['index']);
        })
        this.getUserType()
    
  }

  getEmployee(index:any){
   
    if( typeof this.empservice.emp_data==="undefined"){
         this.router.navigateByUrl('/epmloyee-list');
      return;
    }                
      
        
    let bdate=this.empservice.emp_data[index].dob.split("-");
    //let bdate2=bdate[2]+"/"+bdate[1]+"/"+bdate[0]; 
        
    this.emp_frm.patchValue({
          index:index,
          fname:this.empservice.emp_data[index].fname,
          lname:this.empservice.emp_data[index].lname,
          email:this.empservice.emp_data[index].email,
          dob:{
            date:{
                    year:Number.parseInt(bdate[0]),
                    month:Number.parseInt(bdate[1]),
                    day:Number.parseInt(bdate[2])
                 },
            formatted:bdate[2]+"/"+ bdate[1]+"/"+ bdate[0]  
          },
          address:this.empservice.emp_data[index].address,
          user_type:this.empservice.emp_data[index].user_type,
          phone:this.empservice.emp_data[index].phone_no,   
          gender:this.empservice.emp_data[index].sex   
    });
        
  }

  editEmp(empData){
    
    this.fname=empData.fname;
    this.lname=empData.lname;
    this.email=empData.email;
    this.dob=empData.dob.formatted;
    this.address=empData.address;
    this.phone=empData.phone;
    this.sex=empData.gender;
    this.user_type=empData.user_type;
    
    let user_info={
      id:this.empservice.emp_data[empData.index].id,
      fname:this.fname,
      lname:this.lname,
      email:this.email,
      dob:(this.dob).split("/")[2]+"-"+(this.dob).split("/")[1]+"-"+(this.dob).split("/")[0],
      address:this.address,
      sex:this.sex,
      phone_no:this.phone,
      user_type:this.user_type
     };
    let auser:User=new User(user_info);
   
    
    const emp_json=JSON.stringify(user_info);
    
    this.empservice.updateEmployee(emp_json)
                   .subscribe(data=>{
                          this.emp_frm.reset();
                          this.empservice.sendMessage("Employee Updated successfully")
                          this.empservice.emp_data[empData.index]=auser;
                          this.router.navigateByUrl("/epmloyee-list");
                    });
  }
  getUserType(){
    
         this.empservice.getUserTypeList().subscribe(data=>{
              this.user_type_list=data; 
          })
      }

}
