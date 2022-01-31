import { ValidatorsKeyType } from '../enum/validation-key-type.enum';

/**
 * Extend ErrorMessageCallerInterface in your custom class and provide
 * custom validators enum types if needed
 */
export interface ErrorMessageCallerInterface {
  [ValidatorsKeyType.EMAIL]?: (arg?: unknown) => string;
  [ValidatorsKeyType.REQUIRED]?: (arg?: unknown) => string;
  [ValidatorsKeyType.MAX_LENGTH]?: (arg?: unknown) => string;
  [ValidatorsKeyType.MIN_LENGTH]?: (arg?: unknown) => string;
  [ValidatorsKeyType.MAX]?: (arg?: unknown) => string;
  [ValidatorsKeyType.MIN]?: (arg?: unknown) => string;
  [ValidatorsKeyType.REQUIRED_TRUE]?: (arg?: unknown) => string;
  [ValidatorsKeyType.PATTERN]?: (arg?: unknown) => string;
}
