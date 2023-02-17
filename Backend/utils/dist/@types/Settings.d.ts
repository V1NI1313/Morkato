export interface ErrorSettings {
    status: number;
    message: string;
}
export interface BaseExceptions {
    notExists: ErrorSettings;
    alreadyExists: ErrorSettings;
}
export interface GuildSettings {
    arq: string;
    exceptions: BaseExceptions;
}
export interface Resp {
    local: string;
    form_local: string;
    exceptions: BaseExceptions;
}
export interface ExceptionsSettings {
    body: ErrorSettings;
    joiError: ErrorSettings;
    notAccess: ErrorSettings;
    botNotInGuild: ErrorSettings;
}
export interface ApiSettings {
    access_token: string;
    exceptions: ExceptionsSettings;
    guilds: GuildSettings;
    respirations: Resp;
    kekkijutsus: Resp;
}
export interface Settings {
    token: string;
    url: string;
    api: ApiSettings;
}
