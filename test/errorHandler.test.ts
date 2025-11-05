import { Request, Response } from "express";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import {
    AuthenticationError,
    AuthorizationError,
    ServiceError,
} from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Error handling middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        mockRequest = {};
        mockResponse = {
            status: statusMock,
        };
        nextFunction = jest.fn();
    });

    it("should handle AuthenticationError with correct status and message", () => {
        // ARRANGE:
        const error = new AuthenticationError("Invalid token", "TOKEN_INVALID");

        // ACT:
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // ASSERT:
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);
        expect(jsonMock).toHaveBeenCalledWith({
            status: "error",
            error: {
                message: "Invalid token",
                code: "TOKEN_INVALID",
            },
            timestamp: expect.any(String),
        });
    });

    it("should handle AuthorizationError with correct status and message", () => {
        // ARRANGE:
        const error = new AuthorizationError(
            "Insufficient permissions",
            "INSUFFICIENT_ROLE"
        );

        // ACT:
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // ASSERT:
        expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.FORBIDDEN);
        expect(jsonMock).toHaveBeenCalledWith({
            status: "error",
            error: {
                message: "Insufficient permissions",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });

    it("should handle generic Error with 500 status", () => {
        // ARRANGE:
        const error = new Error("Unexpected error");

        // ACT:
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // ASSERT:
        expect(statusMock).toHaveBeenCalledWith(
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
        expect(jsonMock).toHaveBeenCalledWith({
            status: "error",
            error: {
                message: "An unexpected error occurred",
                code: "UNKNOWN_ERROR",
            },
            timestamp: expect.any(String),
        });
    });

    it("should handle null error gracefully", () => {
        // ACT:
        errorHandler(
            null,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // ASSERT:
        expect(statusMock).toHaveBeenCalledWith(
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
        expect(jsonMock).toHaveBeenCalledWith({
            status: "error",
            error: {
                message: "An unexpected error occurred",
                code: "UNKNOWN_ERROR",
            },
            timestamp: expect.any(String),
        });
    });

    it("should handle ServiceError with custom status code", () => {
        // ARRANGE:
        const error = new ServiceError(
            "Validation failed",
            "VALIDATION_ERROR",
            422
        );

        // ACT:
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // ASSERT:
        expect(statusMock).toHaveBeenCalledWith(422);
        expect(jsonMock).toHaveBeenCalledWith({
            status: "error",
            error: {
                message: "Validation failed",
                code: "VALIDATION_ERROR",
            },
            timestamp: expect.any(String),
        });
    });
});
