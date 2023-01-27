from __future__ import annotations

from typing import TypedDict, Union,  TYPE_CHECKING

if TYPE_CHECKING:
  from . import Guild

class TypedRole(TypedDict):
  name: str
  id: int
  color: str
  hoist: bool
  icon: Union[str, None]
  unidecode_emoji: Union[str, None]
  position: int
  permissions: str
  managed: bool
  mentionable: bool

class Role:
  def __init__(self, guild: Guild, data: TypedRole) -> None:
    self.guild = guild
    self._load_data(data)
  def __repr__(self) -> str:
    return f'Role(name={self.name!r} id={self.id})'
  def __eq__(self, __other: Role) -> bool:
    if not isinstance(__other, Role):
      return False
    return self.id == __other.id
  def _load_data(self, data: TypedRole) -> None:
    self.name: str = data['name']
    self.icon: Union[str, None] = data['icon']
    self.color: str = data['color']
    self.id: int = int(data['id'])
    self.mention: str = f'<@&{self.id}>'
    self.position: int = data['position']
    self.permissions: str = data['permissions']