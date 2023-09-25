export class InvalidUserPasswordError extends Error {
    constructor() {
        super("Invalid user or password");
    }
}

export class InvalidUser extends Error {
    constructor() {
        super("Invalid user");
    }
}

export class InvalidIdError extends Error {
    constructor() {
        super(`Invalid id`);
    }
}

export class ProductAlreadyExistsError extends Error {
    constructor() {
        super("Product name already exists");
    }
}

export class InvalidSubCategory extends Error {
    constructor() {
        super("Sub category doesn't exist");
    }
}