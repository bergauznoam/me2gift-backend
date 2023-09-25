import { IAppConfiguration } from "@interfaces/IAppConfiguration";

export const appConfiguration: IAppConfiguration = {
    appName: "me2gift",
    saltRounds: +process.env.PASSWORD_SALT_ROUNDS,
    jwtAccessTokenHeaderName: "X-Access-Token",
    jwtExpiry: process.env.JTW_EXPIRY,
    jwtSecret: process.env.JTW_SECRET
}