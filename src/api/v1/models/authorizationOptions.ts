export interface AuthorizationOptions {
    hasRole: Array<"officer" | "manager" | "user" | "admin">;
    allowSameUser?: boolean;
}
