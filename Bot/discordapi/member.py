from __future__ import annotations

from typing import Generator, Iterable, TypedDict, Union, TYPE_CHECKING
from .user import User, TypedUser
from .role import TypedRole, Role
from utilz import Route, secret
import datetime
import json

if TYPE_CHECKING:
  from . import Guild

API = 'https://discord.com/api/v6'

class _TypedMember(TypedDict):
  user: TypedUser
  nick: Union[str, None]
  avatar: Union[str, None]
  roles: Iterable[TypedRole]
  joined_at: datetime.datetime
  premium_since: Union[object, None]
  deaf: bool
  mute: bool
  pending: Union[bool, None]
  permission: str
TypedMember = Union[_TypedMember, dict]

class Member(User):
  def __init__(self, guild: Guild, data: TypedMember) -> None:
    super().__init__(data['user'])
    
    self.guild = guild
    self.is_owner = self.guild.owner_id == self.id
    self.nick = data.get('nick')
    self._roles: list[TypedRole] = (role for role in self.guild.roles if str(role.id) in data['roles'])
    self.joined_at: datetime.datetime = datetime.datetime.strptime(data['joined_at'], r"%Y-%m-%dT%H:%M:%S.%f%z")
    self.deaf: bool = data['deaf']
    self.muted: bool = data['mute']
  @property
  def roles(self) -> Generator[Role, None, None]:
    with Route(API, headers=secret) as router:
      status, text, _ = router.get(f'/guilds/{self.guild.id}/mebers/{self.id}/roles', call=lambda res: (res.status_code, res.text, res), in_cache=False)
    if not status == 200:
      if status == 429:
        return self._roles
      else: _.raise_for_status()
    self._roles = (role for role in self.guild.roles if str(role.id) in json.loads(text))
    return self._roles
