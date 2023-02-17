from typing import TypedDict, List

class PlayerSettings(TypedDict):
  breed: int
  life: List[int]
  stamina: List[int]
  rolls: List[int]
  nick: List[str]

class Settings(TypedDict):
  player: PlayerSettings

class Guild(TypedDict):
  id: str
  settings: Settings