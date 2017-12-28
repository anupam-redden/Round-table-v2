import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { EmployeeService } from '../../services/employee-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import {Project} from '../../model/project';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  prj_frm:FormGroup;

  constructor(private pservice:ProjectService,private router:Router,private epmservice:EmployeeService,private fb:FormBuilder) { 

       this.prj_frm=fb.group({
                                 'name':[null,Validators.compose([Validators.required])],
                                 'description':[null,Validators.compose([Validators.required])],
                                 'bdm_id':["",Validators.compose([Validators.required])]

                            });

  }


  ngOnInit() {

    this.epmservice.getUserByType(3);
  }


  saveProject(frm_value):void{
    let proj_data:Project=new Project(frm_value);
    this.pservice.saveProject(frm_value)
                 .subscribe(data=>{
                      this.prj_frm.reset();
                      this.pservice.project_data.push(new Project(data));
                      this.pservice.sendMessage("Project Added successfully")
                      this.router.navigateByUrl("/project-list");
                 });
  }
  
}
