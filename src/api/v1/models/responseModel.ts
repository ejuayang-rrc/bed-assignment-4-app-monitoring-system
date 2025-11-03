/**
 * Creates a standardized error response object.
 * @param {string} message - The error message to display.
 * @param {string} code - The error code.
 * @returns {object} A formatted error response object.
 */
export const errorResponse = (
    message: string, code: string
) => ({
    success: false,
    error: {
        message,
        code,
    },
    timestamp: new Date().toISOString(),
});

