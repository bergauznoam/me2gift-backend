export interface IAppConfiguration {
    appName: string;
    saltRounds: number;
    jwtExpiry: string;
    jwtSecret: string;
}