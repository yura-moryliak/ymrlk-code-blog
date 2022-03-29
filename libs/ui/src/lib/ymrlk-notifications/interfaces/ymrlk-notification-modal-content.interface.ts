import {TemplateRef} from '@angular/core';

export interface YmrlkNotificationModalContentInterface {
  title: string;

  text?: string;

  panelClass?: string;

  template?: TemplateRef<HTMLDivElement>;

  closeButtonText?: string;

  confirmButtonText?: string;
}
