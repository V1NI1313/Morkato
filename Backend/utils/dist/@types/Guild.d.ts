import Joi from 'joi';
export interface PlayerSettings {
    breed: number;
    life: number[];
    stamina: number[];
    rolls: number[];
    nick: string[];
}
export interface Settings {
    player: PlayerSettings;
}
export interface Guild {
    id: string;
    settings: Settings;
}
interface Schemas {
    PlayerSettings: Joi.ObjectSchema<PlayerSettings>;
    Settings: Joi.ObjectSchema<Settings>;
    Guild: Joi.ObjectSchema<Guild>;
}
export declare const schema: Schemas;
export {};
