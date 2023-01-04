import { FormBuilder,FormGroup,FormsModule,Validators} from "@angular/forms";
import { mustmatch } from "./passwordMatch";
import { is18 } from "./datevalidation";


export class User {
    
    
 static signUpForm:FormGroup ;
    

   signUpForm=this.frombuilder.group({
        name:[
            '',[
             Validators.required,
             Validators.pattern(
               /^[A-Za-z][A-Za-z0-9_-]*$/
             )
             ]
           ],
           email:[
             '',
            [ Validators.email,
             Validators.required]
           ],
           dateOfBirth:[
             '',
             [
             Validators.required
           ]
           ],
           password:[
             '',
             [Validators.required,
             Validators.pattern(
               /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
             )]
           ],
           confirmPassword:[
             null,
             [Validators.required]
           ]
     
         },
         {
           validator: [
             mustmatch('password','confirmPassword'),
             is18('dateOfBirth')
           ]
           
         }
    )
    
    constructor(
        private frombuilder:FormBuilder,
    ){}
   
}
