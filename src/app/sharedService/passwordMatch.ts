import {FormGroup} from "@angular/forms";
 export function mustmatch(controlName:string,matchingcontrolname:string)
 {
     
     return (formGroup:FormGroup)=>{
         const control = formGroup.controls[controlName];
         const matchingControl=formGroup.controls[matchingcontrolname];
        
         if (matchingControl?.errors && !matchingControl?.errors["mustMatch"]) {
            // return if another validator has already found an error on the matchingControl
            // console.log("1st error");
            return;
        }
        if(control?.value!==matchingControl?.value)
        {
            matchingControl?.setErrors({ mustMatch:true});
             //console.log(matchingControl?.errors?.mustMatch);
        }
        else{
            matchingControl?.setErrors(null);
            // console.log(matchingControl?.errors?.mustMatch);
        }

     }
 }