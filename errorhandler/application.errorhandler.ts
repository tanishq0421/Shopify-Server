export enum ErrorType {
  GENERAL = "General",
  VALIDATION = "Validation",
  NETWORK = "Network",
  API = "API",
  NOT_FOUND = "Not Found",
}

export class ApplicationError extends Error {
  readonly type: ErrorType;

  constructor(message: string, type: ErrorType = ErrorType.GENERAL) {
    super(message);
    this.name = "ApplicationError";
    this.type = type;
  }
}
