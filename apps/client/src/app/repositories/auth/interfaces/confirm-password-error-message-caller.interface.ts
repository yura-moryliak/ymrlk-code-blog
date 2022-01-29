import { ErrorMessageCallerInterface } from '@ymrlk-code-blog/ymrlk-common';

export interface ConfirmPasswordErrorMessageCallerInterface extends ErrorMessageCallerInterface {
  [passwordMismatch: string]: () => string;
}
