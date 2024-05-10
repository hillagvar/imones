import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[phoneValidator]',
  providers: [{
    provide:  NG_VALIDATORS,
    useClass: PhoneValidatorDirective,
    multi: true
  }
],
  standalone: true
})
export class PhoneValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const phoneNumber : string = control.value;

    if (control.value != null ) {
      if (phoneNumber[0] !== "+") {
        return {error: "Priekyje nera pliuso"};
      } else if (phoneNumber.length <10 || phoneNumber.length >12) {
        return {error: "Netinkamas ilgis"};
      } else if (isNaN(Number(phoneNumber.slice(1,phoneNumber.length)))) {
        return {error: "Netinkami simboliai"};
      } else
      return null;
    }
    return null;
    }
    
  }
  


