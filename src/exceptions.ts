export class InvalidUserPasswordError extends Error {
    constructor() {
        super("Invalid user or password");
    }
}