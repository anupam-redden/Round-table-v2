export class User {
    id:string;
    fname:string;
    lname:string;
    email:string;
    phone_no:string;
    user_type:string;
    online:string;
    last_login:string;
    last_logout:string;
    sex:string;
    dob:string;
    address:string;
    user_status:string;

   
    constructor(user_info){
        this.id=user_info.id,
        this.fname=user_info.fname,
        this.lname=user_info.lname,
        this.email=user_info.email,
        this.dob=(user_info.dob),
        this.address=user_info.address,
        this.sex=user_info.sex,
        this.phone_no=user_info.phone_no,
        this.user_type=user_info.user_type
    }
}
