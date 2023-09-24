import { IAppConfiguration } from "src/interfaces/IAppConfiguration";

export const appConfiguration: IAppConfiguration = {
    appName: "me2gift",
    saltRounds: process.env.PASSWORD_SALT_ROUNDS,
    jwtSecret: process.env.JTW_SECRET
}