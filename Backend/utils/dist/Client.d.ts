import { Guild as EditableGuild } from './@types/@editable/Guild';
import { Settings } from './@types/Settings';
import { Guild } from './@types/Guild';
import { Guilds } from './Guild';
declare class Payload {
    settings: Settings;
    guilds: Guilds;
    constructor(settings: Settings);
    verify(v: string): Promise<boolean>;
    get(v: string): Promise<any>;
}
export declare class Client extends Payload {
    getGuild(id: string): Promise<Guild | null>;
    getGuildIndex(id: string): Promise<number | null>;
    newGuild(id: string): Promise<Guild | undefined>;
    editGuild(g: Guild, e: EditableGuild): Promise<Guild | undefined>;
}
export {};
