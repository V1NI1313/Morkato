export interface PlayerSettings {
  breed?: number,
  life?: number[],
  stamina?: number[],
  rolls?: number[],
  nick?: string[]
}

export interface Settings {
  player?: PlayerSettings
}
export interface Guild {
  id: string,
  settings?: Settings
}