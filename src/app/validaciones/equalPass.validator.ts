import { ValidatorFn, AbstractControl} from '@angular/forms';

function equalsValidator(otherControl: AbstractControl) {
  return (control: AbstractControl) => {
    const value: any = control.value;
    const otherValue: any = otherControl.value;
    return otherValue === value ? null : { 'notEquals': { value, otherValue } };
  };
}

export const CustomValidators = {
  equals: equalsValidator
};
