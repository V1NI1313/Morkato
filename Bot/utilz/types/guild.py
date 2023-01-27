from typing import TypedDict, List

class TypedSettingsPlayer(TypedDict):
  breed: int
  life: List[int]
  stamina: List[int]
  rolls: List[int]
  nick: List[str]

class TypedSettingsAttack(TypedDict):
  damege: List[int]
  stamina: List[int]

class TypedSettings(TypedDict):
  player: TypedSettingsPlayer
  attack: TypedSettingsAttack

class TypedGuild(TypedDict):
  id: int
  settings: TypedSettings