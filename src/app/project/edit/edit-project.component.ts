import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { EmployeeService } from '../../services/employee-service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import {Project} from '../../model/project';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  prj_frm:FormGroup;

  constructor(private pservice:ProjectService,private router:Router,private epmservice:EmployeeService,private fb:FormBuilder,private route:ActivatedRoute) { 
    let regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
       this.prj_frm=fb.group({
                                 'index':[''],
                                 'id':[''],
                                 'name':[null,Validators.compose([Validators.required])],
                                 'description':[null,Validators.compose([Validators.required])],
                                 'bdm_id':["",Validators.compose([Validators.required])],
                                 'url':[null,Validators.compose([Validators.pattern(regex)])]

                            });

  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
           this.getProject(params['index']);  
    })
    this.epmservice.getUserByType(3);
  }

  getProject(index:any){

    if( typeof this.pservice.project_data==="undefined"){
      this.router.navigateByUrl('/project-list');
      return;
    } 
    
    
    this.prj_frm.patchValue({
          index:index,
          id:this.pservice.project_data[index].id,
          name:this.pservice.project_data[index].name,
          description:this.pservice.project_data[index].description,
          bdm_id:this.pservice.project_data[index].bdm_id,
          url:this.pservice.project_data[index].url

    });
  }

  updateProject(frm_value):void{
    let proj_data:Project=new Project(frm_value);
    this.pservice.updateProject(frm_value)
                 .subscribe(data=>{
                      this.prj_frm.reset();
                      this.pservice.project_data[frm_value.index]=proj_data;
                      this.pservice.sendMessage("Project edited successfully")
                      this.router.navigateByUrl("/project-list");
                 });
  }

}
