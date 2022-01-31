import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { ErrorMessageCallerInterface } from '@ymrlk-code-blog/ymrlk-common';

@Component({
  selector: 'ymrlk-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormControlComponent implements ControlValueAccessor {

  @Input() controlLabel: string | undefined;
  @Input() type: 'text' | 'password' | 'date' | 'tel' | 'email' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() required: boolean | undefined;

  // Error message directive API
  @Input() errorLabel: string | undefined;
  @Input() errorMessageCallers: ErrorMessageCallerInterface | undefined;
  @Input() errorClosable: boolean | undefined;
  @Input() errorClosableOnBlur: boolean | undefined;

  value = '';
  isDisabled = false;

  constructor(public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange(value?: any): void { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched(): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string): void {
    this.value = outsideValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  updateValue(insideValue: any): void {
    this.value = insideValue;
    this.onChange(insideValue);
    this.onTouched();
  }
}
