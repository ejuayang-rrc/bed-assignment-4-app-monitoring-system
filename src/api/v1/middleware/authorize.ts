import { Request, Response, NextFunction } from "express";

import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/express";
import { AuthorizationError } from "../errors/errors";

/**
 * Middleware to check if a user is authorized based on their role or UID.
 * @param opts - The authorization options.
 * @returns The middleware function.
 */
const isAuthorized = (opts: AuthorizationOptions): MiddlewareFunction => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role, uid } = res.locals;
            const { id } = req.params;

            if (opts.allowSameUser && id && uid === id) {
                return next();
            }

            if (!role) {
                throw new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                );
            }

            if (opts.hasRole.includes(role)) {
                return next();
            }

            throw new AuthorizationError(
                "Forbidden: Insufficient role",
                "INSUFFICIENT_ROLE"
            );
        } catch (error) {
            next(error);
        }
    };
};

export default isAuthorized;