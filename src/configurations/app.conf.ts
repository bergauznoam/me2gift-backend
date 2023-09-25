import { IAppConfiguration } from "@interfaces/IAppConfiguration";

export const appConfiguration: IAppConfiguration = {
    appName: "me2gift",
    saltRounds: process.env.PASSWORD_SALT_ROUNDS,
    jwtExpiry: process.env.JTW_EXPIRY,
    jwtSecret: process.env.JTW_SECRET
}