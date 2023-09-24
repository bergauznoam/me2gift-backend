export interface IAppConfiguration {
    appName: string;
    saltRounds: number;
    jwtSecret: string;
}