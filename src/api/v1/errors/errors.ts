import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Base error class for application errors.
 */
export class AppError extends Error {
    /**
     * Creates a new AppError instance.
     * @param message - The error message.
     * @param code - The error code.
     * @param statusCode - The http response code.
     */
    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Class representing a repository error.
 */
export class RepositoryError extends AppError {
    constructor(
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Class representing a service error.
 */
export class ServiceError extends AppError {
    constructor(
        message: string,
        code: string = "SERVICE_ERROR",
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Class representing an authentication error.
 */
export class AuthenticationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHENTICATION_ERROR",
        statusCode: number = HTTP_STATUS.UNAUTHORIZED
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Class representing an authorization error.
 */
export class AuthorizationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHORIZATION_ERROR",
        statusCode: number = HTTP_STATUS.FORBIDDEN
    ) {
        super(message, code, statusCode);
    }
}
