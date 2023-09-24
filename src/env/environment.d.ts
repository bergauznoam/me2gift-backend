declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            DATABASE_CONNECTION: string;
            DATABASE_NAME: string;
            DATABASE_HOST: string;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            DATABASE_PORT: number;
            DATABASE_ENABLE_LOGGING: string;
            PASSWORD_SALT_ROUNDS: number;
            JTW_SECRET: string;
        }
    }
}

export { }