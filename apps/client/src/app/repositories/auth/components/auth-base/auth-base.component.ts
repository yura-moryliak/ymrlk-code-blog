import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SubSink } from 'subsink';

import { AuthBaseInterface } from './interfaces/auth-base.interface';

@Component({
  selector: 'ymrlk-auth-base',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthBaseComponent implements AuthBaseInterface, OnDestroy {

  form: FormGroup = new FormGroup({});

  protected subSink: SubSink = new SubSink();

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submit(): void { }

}
