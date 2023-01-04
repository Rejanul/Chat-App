import { FormGroup } from '@angular/forms';
import * as moment from 'moment';


export function is18(datecontrol:string)
 {
     return (formGroup:FormGroup)=>{
         const control = formGroup.controls[datecontrol];
         if(control.errors && !control.errors['IS18'])
         {
             return;
         }
         
        if(moment(control.value).add(18, 'years') >= moment())
        {
            
            control.setErrors({ IS18 : true});
        }
        else{
            control.setErrors(null);
            
        }

     }
 }