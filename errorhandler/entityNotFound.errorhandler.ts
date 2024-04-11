import { ApplicationError, ErrorType } from './application.errorhandler';

export class EntityNotFoundError extends ApplicationError {
  constructor(entity: string, message: string = `${entity} not found`) {
    super(message, ErrorType.NOT_FOUND);
    this.name = 'EntityNotFoundError';
  }
}
