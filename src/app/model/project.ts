export class Project{
    id:string;
    name:string;
    description:string;
    url:string;
    status:string;
    bdm_id:string;

    constructor(project_info){
        this.id=project_info.id;
        this.name=project_info.name;
        this.description=project_info.description,
        this.url=project_info.url;
        this.status=project_info.status;
        this.bdm_id=project_info.bdm_id;
    }

}