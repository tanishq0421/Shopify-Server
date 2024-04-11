import { ApplicationError, ErrorType } from './application.errorhandler';

export class InvalidEntityError extends ApplicationError {
  constructor(entity: string) {
    super(`Invalid ${entity}`, ErrorType.VALIDATION);
    this.name = 'InvalidEntityError';
  }
}
