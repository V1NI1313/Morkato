import { Guild as EditableGuild } from './@types/@editable/Guild';
import { Guild } from './@types/Guild';
import Joi from 'joi';
declare class Payload {
    v: Guild[];
    constructor(v: Guild[]);
    getItem(k: number): Guild | null;
    setItem(k: number, v: Guild): void;
    add(g: Guild): number;
}
export declare class Guilds extends Payload {
    get(id: string): Guild | null;
    getIndex(id: string): number | null;
    new(guild: EditableGuild): Guild | undefined;
}
interface utilsGuild {
    schema: Joi.ObjectSchema<Guild>;
    getSchema(guild: Guild): Joi.ObjectSchema<Guild>;
    editGuild(guild: Guild, editable: EditableGuild): Guild | undefined;
}
export declare const utils: utilsGuild;
export {};
