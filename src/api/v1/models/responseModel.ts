/**
 * Interface representing a standard API response
 */
export interface ApiResponse<T> {
    /** The status of the response, e.g., 'success' or 'error */
    status: string;

    /** The data returned in the response */
    data?: T;

    /** A message providing additional information about the response */
    message?: string;

    /** An error message, if applicable */
    error?: string;

    /** An error code, if applicable */
    code?: string;
}

/**
 * Creates a success response object
 * @param data - The data to include in the response
 * @param message - A message providing additional information about the response
 * @returns The success response object
 */
export const successResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message
});

/**
 * Creates an error response object
 * @param message - The error message
 * @param code - An optional error code for debugging
 * @returns The error response object
 */
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    error: message,
    code
});
