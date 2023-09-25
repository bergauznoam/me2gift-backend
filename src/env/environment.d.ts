declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            DATABASE_CONNECTION: "mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "mongodb";
            DATABASE_NAME: string;
            DATABASE_HOST: string;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            DATABASE_PORT: number;
            DATABASE_ENABLE_LOGGING: string;
            PASSWORD_SALT_ROUNDS: number;
            JTW_EXPIRY: string;
            JTW_SECRET: string;
            APP_ADMIN_EMAIL: string;
            APP_ADMIN_INITIAL_PASSWORD: string;
        }
    }
}

export { }