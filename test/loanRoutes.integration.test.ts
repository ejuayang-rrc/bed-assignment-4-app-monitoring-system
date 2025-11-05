import request from "supertest";
import app from "../src/app";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig");

describe("GET /api/v1/loans - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response = await request(app)
            .get("/api/v1/loans/");

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "user",
        });

        // Act
        const response = await request(app)
            .get("/api/v1/loans/")
            .set("Authorization", "Bearer valid-token");

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });

    it("should succeed when user has proper role and token", async () => {
        // Arrange
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "manager123",
            role: "manager",
        });

        // Act
        const response = await request(app)
            .get("/api/v1/loans/")
            .set("Authorization", "Bearer valid-role-token");

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
    });
});