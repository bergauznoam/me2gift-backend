export interface IAppConfiguration {
    appName: string;
    saltRounds: number;
    jwtAccessTokenHeaderName: string;
    jwtExpiry: string;
    jwtSecret: string;
}