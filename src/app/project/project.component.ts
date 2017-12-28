import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private pservice:ProjectService,private router:Router) { }
  message:string="";
  ngOnInit() {
    
   this.pservice.currentMessage.subscribe(msg=>this.message=msg);
   if(typeof this.pservice.project_data==='undefined')
          this.getProjects()
  }
  
  getProjects():void{
    this.pservice.getProjectList();
  }

  deleteProject(index:any):void{
    if(confirm("Are you sure to delete this project?")){
      
      this.pservice.deleteProject(this.pservice.project_data[index].id).subscribe(data=>{
        if(data==1){
          this.pservice.sendMessage("Employee deleted successfully");
          this.pservice.project_data.splice(index,1);
        }  
      });
    }
    
  }

}
