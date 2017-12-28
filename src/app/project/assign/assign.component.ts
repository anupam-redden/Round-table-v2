import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { EmployeeService } from '../../services/employee-service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import {Project} from '../../model/project';
import {User} from '../../model/user';
@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {
  public developer_data:any;
  public project_dtl:Project;
  public free_worker:User[];
  public hide_free_worker:boolean=true;
  message:string="";
  constructor(private pservice:ProjectService,private router:Router,private epmservice:EmployeeService,private fb:FormBuilder,private route:ActivatedRoute) {

    if(typeof this.pservice.project_data === 'undefined')
        this.router.navigateByUrl('/project-list');
    this.project_dtl=new Project({name:"",description:""});
    

   }

  ngOnInit() {
    
   
    this.route.params.subscribe(params=>{
          this.getAssignedUser(params['index']);  
     })
     
  }

  getAssignedUser(index:any):void{
    this.pservice.getAssignedUser(this.pservice.project_data[index].id)
                 .subscribe(data=>{
                      this.developer_data=data;  
                      this.project_dtl=this.pservice.project_data[index];
                      
                      let all_ids="";
                      for(let item of this.developer_data){
                           if(all_ids!="")
                               all_ids=all_ids+","
                            
                         all_ids=all_ids+item.user_id;  

                      }

                      this.pservice.getFreeWorkers(all_ids)
                                   .subscribe(todo=>{
                                    this.free_worker=todo
                                   }) ;


                 })
  }

  showHideAddNew(){
      this.hide_free_worker=!this.hide_free_worker;
  }

  addNewDeveloper(val:any){
    this.pservice.assignToProject(val,this.project_dtl.id)
                 .subscribe(todo=>{
                            this.route.params.subscribe(params=>{
                              this.getAssignedUser(params['index']);  
                            })
                 }) ;
  }

  deleteProjectWorker(user_id:any){
    this.pservice.removeFromProject(user_id,this.project_dtl.id)
                 .subscribe(todo=>{
                    
                  this.route.params.subscribe(params=>{
                    this.getAssignedUser(params['index']);  
                  })

                 })
  }
  
  
}
