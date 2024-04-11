import { ApplicationError, ErrorType } from './application.errorhandler';

export class ResourceNotFoundError extends ApplicationError {
  constructor(resource: string, message: string = `${resource} not found`) {
    super(message, ErrorType.NOT_FOUND);
    this.name = 'ResourceNotFoundError';
  }
}
