export class InvalidUserPasswordError extends Error {
    constructor() {
        super("Invalid user or password");
    }
}

export class InvalidProductId extends Error {
    constructor() {
        super("Invalid product id");
    }
}

export class ProductAlreadyExistsError extends Error {
    constructor() {
        super("Product name already exists");
    }
}