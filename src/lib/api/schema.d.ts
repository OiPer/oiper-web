/* eslint-disable @typescript-eslint/naming-convention, prettier/prettier */
export interface paths {
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Health check */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["HealthResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    callbackUrl?: string;
                    mode?: components["schemas"]["WebAuthMode"];
                    provider?: components["schemas"]["WebOAuthProvider"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Redirects the browser to the WorkOS authorization flow */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query: {
                    code: string;
                    state: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Redirects the browser back to the web app after authentication */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/sign-in/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebPasswordSignInBody"];
                };
            };
            responses: {
                /** @description Signs in with email and password */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PasswordAuthResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Password sign-in failed to establish a session */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UnauthenticatedWebSession"];
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/sign-up/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebPasswordSignUpBody"];
                };
            };
            responses: {
                /** @description Creates a password-based account */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PasswordAuthResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Password sign-up failed to establish a session */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UnauthenticatedWebSession"];
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_EMAIL_ALREADY_EXISTS" | "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_INVALID_CREDENTIALS" | "AUTH_AUTH_METHOD_NOT_ALLOWED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/verify-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebEmailVerificationBody"];
                };
            };
            responses: {
                /** @description Verifies a pending password-auth email address */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WebSession"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Email verification did not establish a session */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UnauthenticatedWebSession"];
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_INVALID_VERIFICATION_CODE" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/resend-verification": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebResendEmailVerificationBody"];
                };
            };
            responses: {
                /** @description Resends the current pending email verification challenge */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ResendVerificationResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/password-reset/request": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebPasswordResetRequestBody"];
                };
            };
            responses: {
                /** @description Requests a password reset email */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["SentResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/password-reset/confirm": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WebPasswordResetConfirmBody"];
                };
            };
            responses: {
                /** @description Confirms a password reset token */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ResetResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_PASSWORD_POLICY_FAILED" | "AUTH_REQUEST_REJECTED" | "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/csrf-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Issues a CSRF token for cookie-based mutations */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CsrfTokenResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/session": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Returns the current web session state */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WebSession"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/web/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Logs out the current web session */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WebLogoutResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["AccountProfileUpdateBody"];
                };
            };
            responses: {
                /** @description Updates the authenticated account profile */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccountProfile"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/v1/account": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Deletes the authenticated account */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccountDeletedResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_DELETED";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH";
                                /** @enum {string} */
                                code: "AUTH_FAILED" | "AUTH_REQUEST_REJECTED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/subscription": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The authenticated account's current subscription state */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["SubscriptionAccountView"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/subscription/portal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["PortalSessionBody"];
                };
            };
            responses: {
                /** @description The manage-subscription portal URL for whichever provider issued this subscription */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PortalSessionResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/subscription/upgrade": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ChangeSubscriptionPlanBody"];
                };
            };
            responses: {
                /** @description Plan change accepted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ChangeSubscriptionPlanResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/subscription/resume": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The scheduled cancellation was reversed, or the paused subscription resumed */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ResumeSubscriptionResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED" | "BILLING_PAYMENT_FAILED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/subscription/upgrade/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ChangeSubscriptionPlanBody"];
                };
            };
            responses: {
                /** @description What this plan change would cost — the immediate proration (if any) and the new recurring amount — without applying it */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ChangeSubscriptionPlanPreview"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_SUBSCRIPTION_NOT_FOUND" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/subscription/checkout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CreateCheckoutSessionBody"];
                };
            };
            responses: {
                /** @description What the frontend needs to hand off to the chosen provider's hosted checkout UI */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CheckoutSessionResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_PROVIDER_NOT_AVAILABLE" | "BILLING_ALREADY_SUBSCRIBED" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_PROVIDER_NOT_AVAILABLE" | "BILLING_ALREADY_SUBSCRIBED" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_PROVIDER_NOT_AVAILABLE" | "BILLING_ALREADY_SUBSCRIBED" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_PROVIDER_NOT_AVAILABLE" | "BILLING_ALREADY_SUBSCRIBED" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_PROVIDER_NOT_AVAILABLE" | "BILLING_ALREADY_SUBSCRIBED" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_PROVIDER_NOT_AVAILABLE" | "BILLING_ALREADY_SUBSCRIBED" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "BILLING";
                                /** @enum {string} */
                                code: "BILLING_PROVIDER_NOT_AVAILABLE" | "BILLING_ALREADY_SUBSCRIBED" | "BILLING_PLAN_CHANGE_NOT_ALLOWED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/usage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The authenticated account's current cloud usage today */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageAccountView"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Email status and topic preferences */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccountNotifications"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/notifications/activity": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The latest notifications sent to this account */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccountNotificationActivity"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/notifications/topics/{topicKey}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path: {
                    topicKey: components["schemas"]["NotificationTopic"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["AccountNotificationTopicBody"];
                };
            };
            responses: {
                /** @description Subscribes or unsubscribes one topic */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccountNotifications"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        trace?: never;
    };
    "/v1/account/notifications/unsubscribe-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Unsubscribes every optional topic */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccountNotifications"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PREFERENCES_CONFLICT" | "NOTIFICATION_PREFERENCES_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/gifts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The gift the account is on now (with the end of any stacked gifts) and the last gift that ended */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AccountGiftsView"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/account/gifts/claim": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-csrf-token": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ClaimGiftBody"];
                };
            };
            responses: {
                /** @description The gift is now on the account. Claiming a gift that is already yours returns it again */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ClaimedGift"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND" | "GIFT_ALREADY_CLAIMED" | "GIFT_EXPIRED" | "GIFT_REVOKED" | "GIFT_EMAIL_NOT_VERIFIED" | "GIFT_PLAN_CONFLICT" | "GIFT_SUBSCRIPTION_NEEDS_ATTENTION";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND" | "GIFT_ALREADY_CLAIMED" | "GIFT_EXPIRED" | "GIFT_REVOKED" | "GIFT_EMAIL_NOT_VERIFIED" | "GIFT_PLAN_CONFLICT" | "GIFT_SUBSCRIPTION_NEEDS_ATTENTION";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND" | "GIFT_ALREADY_CLAIMED" | "GIFT_EXPIRED" | "GIFT_REVOKED" | "GIFT_EMAIL_NOT_VERIFIED" | "GIFT_PLAN_CONFLICT" | "GIFT_SUBSCRIPTION_NEEDS_ATTENTION";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND" | "GIFT_ALREADY_CLAIMED" | "GIFT_EXPIRED" | "GIFT_REVOKED" | "GIFT_EMAIL_NOT_VERIFIED" | "GIFT_PLAN_CONFLICT" | "GIFT_SUBSCRIPTION_NEEDS_ATTENTION";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND" | "GIFT_ALREADY_CLAIMED" | "GIFT_EXPIRED" | "GIFT_REVOKED" | "GIFT_EMAIL_NOT_VERIFIED" | "GIFT_PLAN_CONFLICT" | "GIFT_SUBSCRIPTION_NEEDS_ATTENTION";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND" | "GIFT_ALREADY_CLAIMED" | "GIFT_EXPIRED" | "GIFT_REVOKED" | "GIFT_EMAIL_NOT_VERIFIED" | "GIFT_PLAN_CONFLICT" | "GIFT_SUBSCRIPTION_NEEDS_ATTENTION";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "USER";
                                /** @enum {string} */
                                code: "USER_ACCOUNT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND" | "GIFT_ALREADY_CLAIMED" | "GIFT_EXPIRED" | "GIFT_REVOKED" | "GIFT_EMAIL_NOT_VERIFIED" | "GIFT_PLAN_CONFLICT" | "GIFT_SUBSCRIPTION_NEEDS_ATTENTION";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/gifts/lookup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["LookupGiftBody"];
                };
            };
            responses: {
                /** @description What a gift link gives and whether it can still be claimed. Signed-in visitors also learn whether it is already theirs */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GiftLookup"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "GIFT";
                                /** @enum {string} */
                                code: "GIFT_NOT_FOUND";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications/subscribe": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["NotificationSubscribeBody"];
                };
            };
            responses: {
                /** @description Subscribes an address to a topic; the response is identical for new and existing addresses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["NotificationAcceptedResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/notifications/unsubscribe/{token}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    token: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Describes the topic an unsubscribe link controls without changing it */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["NotificationUnsubscribeState"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    token: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Unsubscribes the link's topic; also serves RFC 8058 one-click unsubscribe */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["NotificationUnsubscribeResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_UNSUBSCRIBE_TOKEN_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/internal/notifications/campaigns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["NotificationCampaignBody"];
                };
            };
            responses: {
                /** @description Queues a campaign; repeating the same campaign key is a no-op */
                202: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["NotificationCampaignResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PAYLOAD_INVALID" | "NOTIFICATION_QUEUE_UNAVAILABLE";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PAYLOAD_INVALID" | "NOTIFICATION_QUEUE_UNAVAILABLE";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PAYLOAD_INVALID" | "NOTIFICATION_QUEUE_UNAVAILABLE";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PAYLOAD_INVALID" | "NOTIFICATION_QUEUE_UNAVAILABLE";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PAYLOAD_INVALID" | "NOTIFICATION_QUEUE_UNAVAILABLE";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PAYLOAD_INVALID" | "NOTIFICATION_QUEUE_UNAVAILABLE";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_PAYLOAD_INVALID" | "NOTIFICATION_QUEUE_UNAVAILABLE";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/internal/notifications/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    campaignKey?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Queue, activity and suppression counts */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["NotificationStatus"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/pricing": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The visible plan/pricing catalog */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PricingCatalogResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/desktop/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["DesktopAuthStartBody"];
                };
            };
            responses: {
                /** @description Starts a desktop auth handoff flow */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DesktopAuthStartResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/desktop/continue": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query: {
                    requestId: string;
                    callbackUrl?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Returns a launch page that deep-links back into the desktop app */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/html": components["schemas"]["DesktopAuthContinueHtml"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_FAILED" | "AUTH_DESKTOP_REQUEST_NOT_FOUND" | "AUTH_DESKTOP_REQUEST_EXPIRED" | "AUTH_DESKTOP_REQUEST_NOT_PENDING";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_FAILED" | "AUTH_DESKTOP_REQUEST_NOT_FOUND" | "AUTH_DESKTOP_REQUEST_EXPIRED" | "AUTH_DESKTOP_REQUEST_NOT_PENDING";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_FAILED" | "AUTH_DESKTOP_REQUEST_NOT_FOUND" | "AUTH_DESKTOP_REQUEST_EXPIRED" | "AUTH_DESKTOP_REQUEST_NOT_PENDING";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_FAILED" | "AUTH_DESKTOP_REQUEST_NOT_FOUND" | "AUTH_DESKTOP_REQUEST_EXPIRED" | "AUTH_DESKTOP_REQUEST_NOT_PENDING";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_FAILED" | "AUTH_DESKTOP_REQUEST_NOT_FOUND" | "AUTH_DESKTOP_REQUEST_EXPIRED" | "AUTH_DESKTOP_REQUEST_NOT_PENDING";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_FAILED" | "AUTH_DESKTOP_REQUEST_NOT_FOUND" | "AUTH_DESKTOP_REQUEST_EXPIRED" | "AUTH_DESKTOP_REQUEST_NOT_PENDING";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_FAILED" | "AUTH_DESKTOP_REQUEST_NOT_FOUND" | "AUTH_DESKTOP_REQUEST_EXPIRED" | "AUTH_DESKTOP_REQUEST_NOT_PENDING";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/desktop/exchange": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["DesktopAuthExchangeBody"];
                };
            };
            responses: {
                /** @description Exchanges the desktop handoff code for desktop tokens */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DesktopTokenResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_EXCHANGE_INVALID" | "AUTH_DESKTOP_EXCHANGE_NOT_READY" | "AUTH_DESKTOP_HANDOFF_EXPIRED" | "AUTH_DESKTOP_PKCE_VERIFICATION_FAILED" | "AUTH_DESKTOP_HANDOFF_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_EXCHANGE_INVALID" | "AUTH_DESKTOP_EXCHANGE_NOT_READY" | "AUTH_DESKTOP_HANDOFF_EXPIRED" | "AUTH_DESKTOP_PKCE_VERIFICATION_FAILED" | "AUTH_DESKTOP_HANDOFF_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_EXCHANGE_INVALID" | "AUTH_DESKTOP_EXCHANGE_NOT_READY" | "AUTH_DESKTOP_HANDOFF_EXPIRED" | "AUTH_DESKTOP_PKCE_VERIFICATION_FAILED" | "AUTH_DESKTOP_HANDOFF_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_EXCHANGE_INVALID" | "AUTH_DESKTOP_EXCHANGE_NOT_READY" | "AUTH_DESKTOP_HANDOFF_EXPIRED" | "AUTH_DESKTOP_PKCE_VERIFICATION_FAILED" | "AUTH_DESKTOP_HANDOFF_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_EXCHANGE_INVALID" | "AUTH_DESKTOP_EXCHANGE_NOT_READY" | "AUTH_DESKTOP_HANDOFF_EXPIRED" | "AUTH_DESKTOP_PKCE_VERIFICATION_FAILED" | "AUTH_DESKTOP_HANDOFF_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_EXCHANGE_INVALID" | "AUTH_DESKTOP_EXCHANGE_NOT_READY" | "AUTH_DESKTOP_HANDOFF_EXPIRED" | "AUTH_DESKTOP_PKCE_VERIFICATION_FAILED" | "AUTH_DESKTOP_HANDOFF_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_EXCHANGE_INVALID" | "AUTH_DESKTOP_EXCHANGE_NOT_READY" | "AUTH_DESKTOP_HANDOFF_EXPIRED" | "AUTH_DESKTOP_PKCE_VERIFICATION_FAILED" | "AUTH_DESKTOP_HANDOFF_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/desktop/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Revokes the current desktop session */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DesktopAuthLogoutResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_SESSION_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_SESSION_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_SESSION_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_SESSION_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_SESSION_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_SESSION_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "AUTH_DESKTOP";
                                /** @enum {string} */
                                code: "AUTH_DESKTOP_SESSION_INVALID";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/webhooks/workos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WorkosWebhookEvent"];
                };
            };
            responses: {
                /** @description WorkOS webhook receipt */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WorkosWebhookReceipt"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/webhooks/ses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description SES feedback delivered through a signed SNS message */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["SesWebhookReceipt"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_WEBHOOK_REJECTED" | "NOTIFICATION_WEBHOOK_NOT_CONFIGURED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_WEBHOOK_REJECTED" | "NOTIFICATION_WEBHOOK_NOT_CONFIGURED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_WEBHOOK_REJECTED" | "NOTIFICATION_WEBHOOK_NOT_CONFIGURED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_WEBHOOK_REJECTED" | "NOTIFICATION_WEBHOOK_NOT_CONFIGURED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_WEBHOOK_REJECTED" | "NOTIFICATION_WEBHOOK_NOT_CONFIGURED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_WEBHOOK_REJECTED" | "NOTIFICATION_WEBHOOK_NOT_CONFIGURED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_BAD_REQUEST" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "NOTIFICATION";
                                /** @enum {string} */
                                code: "NOTIFICATION_WEBHOOK_REJECTED" | "NOTIFICATION_WEBHOOK_NOT_CONFIGURED";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/webhooks/{provider}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    provider: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Billing webhook receipt */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BillingWebhookReceipt"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_NOT_FOUND" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_NOT_FOUND" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_NOT_FOUND" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_NOT_FOUND" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_NOT_FOUND" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_NOT_FOUND" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_NOT_FOUND" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/internal/worker/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["WorkerStatusBody"];
                };
            };
            responses: {
                /** @description Resolves a desktop access token's current session/entitlement status for the Cloudflare Worker */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WorkerStatusResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/internal/worker/usage-events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UsageEventIngestBody"];
                };
            };
            responses: {
                /** @description Records a single usage/analytics event reported by the Cloudflare Worker */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageEventIngestResponse"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
                /** @description Upstream provider request failed */
                502: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            error: {
                                /** @enum {string} */
                                type: "VALIDATION";
                                /** @enum {string} */
                                code: "VALIDATION_REQUEST_INVALID";
                                message: string;
                                details?: unknown;
                            } | {
                                /** @enum {string} */
                                type: "CORE";
                                /** @enum {string} */
                                code: "CORE_UNAUTHORIZED" | "CORE_INTERNAL_ERROR";
                                message: string;
                                details?: unknown;
                            };
                            requestId: components["schemas"]["RequestId"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        HealthResponse: {
            /** @enum {boolean} */
            ok: true;
            /** @enum {string} */
            service: "oiper-server";
            /** @enum {string} */
            notifications: "ok" | "degraded";
            requestId: string;
        };
        RequestId: string;
        /**
         * @default page
         * @enum {string}
         */
        WebAuthMode: "modal" | "page";
        /**
         * @default google
         * @enum {string}
         */
        WebOAuthProvider: "google" | "github";
        PasswordAuthResponse: components["schemas"]["UnauthenticatedWebSession"] | components["schemas"]["AuthenticatedWebSession"] | components["schemas"]["VerificationRequiredResponse"];
        UnauthenticatedWebSession: {
            /** @enum {boolean} */
            authenticated: false;
            reason: string;
        };
        AuthenticatedWebSession: {
            /** @enum {boolean} */
            authenticated: true;
            accessToken: string;
            sessionId: string;
            user: components["schemas"]["WebSessionUser"];
        };
        WebSessionUser: {
            id: string;
            workosUserId: string;
            /** Format: email */
            email: string;
            emailVerified: boolean;
            firstName: string | null;
            lastName: string | null;
            /** Format: uri */
            profilePictureUrl: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            oiperUserId: string;
        };
        VerificationRequiredResponse: {
            /** @enum {string} */
            type: "email_verification";
            /** Format: email */
            email: string;
            pat: string;
            evid?: string;
        };
        WebPasswordSignInBody: {
            /** Format: email */
            email: string;
            password: string;
        };
        WebPasswordSignUpBody: {
            /** Format: email */
            email: string;
            password: string;
            name: string;
        };
        WebSession: components["schemas"]["UnauthenticatedWebSession"] | components["schemas"]["AuthenticatedWebSession"];
        WebEmailVerificationBody: {
            pat: string;
            otp: string;
        };
        ResendVerificationResponse: {
            /** @enum {boolean} */
            sent: true;
            alreadyVerified: boolean;
        };
        WebResendEmailVerificationBody: {
            evid: string;
        };
        SentResponse: {
            /** @enum {boolean} */
            sent: true;
        };
        WebPasswordResetRequestBody: {
            /** Format: email */
            email: string;
        };
        ResetResponse: {
            /** @enum {boolean} */
            reset: true;
        };
        WebPasswordResetConfirmBody: {
            token: string;
            newPassword: string;
        };
        CsrfTokenResponse: {
            csrfToken: string;
        };
        WebLogoutResponse: {
            /** @enum {boolean} */
            authenticated: false;
            /** Format: uri */
            logoutUrl: string;
        };
        AccountProfile: {
            id: string;
            workosUserId: string;
            /** Format: email */
            email: string;
            emailVerified: boolean;
            firstName: string | null;
            lastName: string | null;
            /** Format: uri */
            profilePictureUrl: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        AccountProfileUpdateBody: {
            name?: string;
            profilePictureUrl?: string | unknown;
        };
        AccountDeletedResponse: {
            /** @enum {boolean} */
            deleted: true;
        };
        SubscriptionAccountView: {
            /** @enum {string} */
            plan: "FREE";
        } | {
            /** @enum {string} */
            plan: "PRO" | "MAX";
            /** @enum {string} */
            billingInterval: "MONTHLY" | "YEARLY";
            /** @enum {string} */
            provider: "PADDLE" | "STRIPE";
            /** @enum {string} */
            status: "ACTIVE" | "PAST_DUE" | "PAUSED" | "CANCELLED" | "EXPIRED";
            /** Format: date-time */
            currentPeriodEnd: string | null;
            cancelAtPeriodEnd: boolean;
            inFreePeriod: boolean;
            currencyCode: string | null;
            nextPayment: {
                amount: string;
                dueAt: string;
            } | null;
            regularAmount: string | null;
            scheduledChange: {
                /** @enum {string} */
                plan: "PRO" | "MAX";
                /** @enum {string} */
                billingInterval: "MONTHLY" | "YEARLY";
                /** Format: date-time */
                changeAt: string;
            } | null;
        };
        PortalSessionResponse: {
            /** Format: uri */
            portalUrl: string;
        };
        PortalSessionBody: {
            /** Format: uri */
            returnUrl?: string;
        };
        ChangeSubscriptionPlanResponse: {
            /** @enum {boolean} */
            changed: true;
        };
        ChangeSubscriptionPlanBody: {
            /** @enum {string} */
            targetPlan: "PRO" | "MAX";
            /** @enum {string} */
            targetInterval: "MONTHLY" | "YEARLY";
        };
        ResumeSubscriptionResponse: {
            /** @enum {boolean} */
            resumed: true;
        };
        ChangeSubscriptionPlanPreview: {
            /** @enum {string} */
            kind: "BLOCKED";
            /** @enum {string} */
            reason: "ENDING" | "PAUSED" | "GIFT";
            /** Format: date-time */
            currentPeriodEnd: string | null;
        } | {
            /** @enum {string} */
            kind: "SCHEDULED";
            currencyCode: string;
            /** Format: date-time */
            effectiveAt: string;
            nextPayment: {
                amount: string;
                dueAt: string;
            };
        } | {
            /** @enum {string} */
            kind: "IMMEDIATE";
            currencyCode: string;
            /** Format: date-time */
            effectiveAt: string;
            immediateChange: {
                /** @enum {string} */
                action: "NONE";
            } | {
                /** @enum {string} */
                action: "CREDIT";
                amount: string;
            } | {
                /** @enum {string} */
                action: "CHARGE";
                amount: string;
                coveredByCredit: string | null;
            };
            nextPayment: {
                amount: string;
                dueAt: string;
            } | null;
            regularAmount: string | null;
        };
        CheckoutSessionResponse: {
            /** @enum {string} */
            provider: "PADDLE";
            transactionId: string;
        } | {
            /** @enum {string} */
            provider: "STRIPE";
            /** Format: uri */
            checkoutUrl: string;
        };
        CreateCheckoutSessionBody: {
            /** @enum {string} */
            provider: "PADDLE" | "STRIPE";
            /** @enum {string} */
            plan: "PRO" | "MAX";
            /** @enum {string} */
            interval: "MONTHLY" | "YEARLY";
            /**
             * @description During a gift: start this higher plan now and pay today instead of when the gift ends
             * @default false
             */
            startNow: boolean;
        };
        UsageAccountView: {
            /** @enum {string} */
            plan: "FREE" | "PRO" | "MAX";
            requestsUsedToday: number;
            cloudSecondsUsedToday: number;
            dailyAllowanceSeconds: number | null;
            remainingSecondsToday: number | null;
            /** Format: date-time */
            allowanceResetsAt: string;
        };
        AccountNotifications: {
            /** @enum {string} */
            emailStatus: "PENDING" | "ACTIVE" | "SUPPRESSED" | "DISABLED";
            /** Format: date-time */
            updatedAt: string;
            topics: {
                key: components["schemas"]["NotificationTopic"];
                subscribed: boolean;
                /** Format: date-time */
                changedAt: string | null;
            }[];
        };
        /** @enum {string} */
        NotificationTopic: "product-releases";
        AccountNotificationActivity: {
            id: string;
            /** @enum {string} */
            channel: "EMAIL";
            workflowKey: string;
            campaignKey: string | null;
            /** @enum {string} */
            status: "PENDING" | "QUEUED" | "PROCESSING" | "RETRYING" | "SENT" | "DELIVERED" | "SKIPPED" | "FAILED" | "BOUNCED" | "COMPLAINED";
            renderedSubject: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            sentAt: string | null;
            /** Format: date-time */
            deliveredAt: string | null;
            /** Format: date-time */
            failedAt: string | null;
        }[];
        AccountNotificationTopicBody: {
            subscribed: boolean;
            /** Format: date-time */
            expectedUpdatedAt: string;
        };
        AccountGiftsView: {
            current: {
                /** @enum {string} */
                plan: "PRO" | "MAX";
                /** Format: date-time */
                startsAt: string;
                /** Format: date-time */
                endsAt: string;
            } | null;
            lastEnded: {
                /** @enum {string} */
                plan: "PRO" | "MAX";
                /** Format: date-time */
                endedAt: string;
            } | null;
        };
        ClaimedGift: {
            /** @enum {string} */
            plan: "PRO" | "MAX";
            /** Format: date-time */
            startsAt: string;
            /** Format: date-time */
            endsAt: string;
            /**
             * Format: date-time
             * @description When the account already pays: the new date of its next payment
             */
            nextPaymentAt: string | null;
        };
        ClaimGiftBody: {
            code: string;
        };
        GiftLookup: {
            /** @enum {string} */
            plan: "PRO" | "MAX";
            months: number;
            message: string | null;
            /** @enum {string} */
            state: "CLAIMABLE" | "CLAIMED_BY_YOU" | "CLAIMED" | "EXPIRED" | "REVOKED";
            /** Format: date-time */
            startsAt: string | null;
            /** Format: date-time */
            endsAt: string | null;
            /** @description For a signed-in visitor, why this account can't claim the gift right now */
            blocked: string | null;
        };
        LookupGiftBody: {
            code: string;
        };
        NotificationAcceptedResponse: {
            /** @enum {boolean} */
            accepted: true;
        };
        NotificationSubscribeBody: {
            email: string;
            topic: components["schemas"]["NotificationTopic"];
        };
        NotificationUnsubscribeState: {
            topic: components["schemas"]["NotificationTopic"];
            subscribed: boolean;
        };
        NotificationUnsubscribeResponse: {
            /** @enum {boolean} */
            unsubscribed: true;
        };
        NotificationCampaignResponse: {
            jobId: string;
        };
        NotificationCampaignBody: {
            /** @enum {string} */
            workflowKey: "product.release-published";
            campaignKey: string;
            payload: {
                [key: string]: unknown;
            };
        };
        NotificationStatus: {
            queue: {
                available: boolean;
                counts: {
                    [key: string]: number;
                } | null;
            };
            activitiesByStatus: {
                [key: string]: number;
            };
            oldestPendingAgeSeconds: number | null;
            suppressedProfiles: number;
            campaign: {
                campaignKey: string;
                activitiesByStatus: {
                    [key: string]: number;
                };
            } | null;
        };
        PricingCatalogResponse: {
            plans: components["schemas"]["PricingPlan"][];
        };
        PricingPlan: {
            /** @enum {string} */
            plan: "FREE" | "PRO" | "MAX";
            /** @enum {string|null} */
            interval: "MONTHLY" | "YEARLY" | null;
            displayName: string;
            priceAmountCents: number;
            effectiveMonthlyCents: number;
            discountPercent: number;
            discountPercentFloored: number;
            features: components["schemas"]["PricingFeature"][];
        };
        PricingFeature: {
            label: string;
            detail: string | null;
        };
        DesktopAuthStartResponse: {
            requestId: string;
            /** Format: uri */
            verificationUrl: string;
            /** Format: date-time */
            expiresAt: string;
        };
        DesktopAuthStartBody: {
            deviceId: string;
            deviceName?: string;
            devicePlatform?: string;
            state: string;
            codeChallenge: string;
        };
        DesktopAuthContinueHtml: string;
        DesktopTokenResponse: {
            requestId?: string;
            user: components["schemas"]["DesktopSessionUser"];
            accessToken: string;
            /** Format: date-time */
            expiresAt: string;
        };
        DesktopSessionUser: {
            userId: string;
            /** Format: email */
            email: string;
            firstName: string | null;
            lastName: string | null;
            /** Format: uri */
            profilePictureUrl: string | null;
        };
        DesktopAuthExchangeBody: {
            requestId: string;
            handoffCode: string;
            codeVerifier: string;
        };
        DesktopAuthLogoutResponse: {
            /** @enum {boolean} */
            revoked: true;
        };
        WorkosWebhookReceipt: {
            /** @enum {boolean} */
            received: true;
            eventId: string;
            handled: boolean;
            eventType: string;
            syncedUserId?: string;
            deletedUsers?: number;
            revokedDesktopSessions?: number;
        };
        WorkosWebhookEvent: ({
            id: string;
            event: string;
            data: {
                [key: string]: unknown;
            };
            createdAt: string;
            context?: {
                [key: string]: unknown;
            };
        } & {
            [key: string]: unknown;
        }) | ({
            /** @enum {string} */
            object?: "event";
            id: string;
            event: string;
            data: {
                [key: string]: unknown;
            };
            created_at: string;
            context?: {
                [key: string]: unknown;
            };
        } & {
            [key: string]: unknown;
        });
        SesWebhookReceipt: {
            /** @enum {boolean} */
            received: true;
            outcome: string;
        };
        BillingWebhookReceipt: {
            /** @enum {boolean} */
            received: true;
            eventId: string;
            handled: boolean;
        };
        WorkerStatusResponse: components["schemas"]["WorkerStatusValidResponse"] | components["schemas"]["WorkerStatusInvalidResponse"];
        WorkerStatusValidResponse: {
            /** @enum {boolean} */
            valid: true;
            userId: string;
            entitlement: components["schemas"]["EntitlementSnapshot"];
            freshAccessToken?: string;
            /** Format: date-time */
            freshAccessTokenExpiresAt?: string;
        };
        EntitlementSnapshot: {
            /** @enum {string} */
            plan: "FREE" | "PRO" | "MAX";
            /** @enum {string} */
            status: "ACTIVE" | "PAST_DUE" | "PAUSED" | "CANCELLED" | "EXPIRED" | "NONE";
            dailyAllowanceSeconds: number | null;
            cloudTranscriptionAllowed: boolean;
            entitlementVersion: number;
        };
        WorkerStatusInvalidResponse: {
            /** @enum {boolean} */
            valid: false;
            /** @enum {string} */
            reason: "invalid_token" | "revoked" | "session_expired";
        };
        WorkerStatusBody: {
            accessToken: string;
        };
        UsageEventIngestResponse: {
            accepted: boolean;
        };
        UsageEventIngestBody: {
            accessToken: string;
            usageEventId: string;
            provider: string;
            model?: string;
            /** @enum {string} */
            operationType: "transcription" | "enhancement" | "translation";
            success: boolean;
            /** Format: date-time */
            requestedAt: string;
            billableSeconds?: number;
            audioDurationMs?: number;
            inputTokens?: number;
            outputTokens?: number;
            totalTokens?: number;
            providerCostCents?: number;
            estimatedCostCents?: number;
            costCurrency?: string;
            totalResponseMs?: number;
            providerLatencyMs?: number;
            timeToFirstTokenMs?: number;
            statusCode?: number;
            errorCategory?: string;
            requestedLanguage?: string;
            detectedLanguage?: string;
            translationSource?: string;
            translationTarget?: string;
            enhancementUsed?: boolean;
            translationUsed?: boolean;
            wordCount?: number;
            characterCount?: number;
            sentenceCount?: number;
            platform?: string;
            appVersion?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
