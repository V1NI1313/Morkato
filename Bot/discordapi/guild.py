from typing import TypeVar, Generator, Union, Any
from utilz import Route, auth, find
from .member import Member
from .role import Role
import json
### -> Exceptions <- ###
from .errors import (
  utilsErrorGeneric,
  NotPermission as GuildNotPermission
)

API = 'https://discord.com/api/v6'

class discordGuildNotExists(utilsErrorGeneric):
  def __init__(self) -> None:
    super().__init__("The specified guild does not exists.")

class discordGuild:
  def __init__(self, id: int) -> None:
    with Route(API, headers=auth) as router:
      status, text = router.get(f'/guilds/{id}', call=(lambda res: (res.status_code, res.text)), in_cache=False)
    if not status == 200:
      if status in (401, 403, 422):
        raise GuildNotPermission
      else:
        raise discordGuildNotExists
    self._load_data(json.loads(text))
  def __repr__(self) -> str:
    return f"Guild(name={self.name!r} id={self.id})"
  def _load_data(self, data: dict[str, Any]) -> None:
    self.name: str = data["name"]
    self.id: int = int(data["id"])
    self.owner_id: int = int(data['owner_id'])
    self.icon: str = data["icon"]
    self._roles: list = (Role(self, elem) for elem in data["roles"])
    self._members = self.members
  @property
  def roles(self) -> Generator[Role, None, None]:
    with Route(API, headers=auth) as router:
      status, text, _ = router.get(f'/guilds/{self.id}/roles', call=lambda res: (res.status_code, res.text, res), in_cache=False)
    if not status == 200:
      if status in (401, 403, 422):
        raise GuildNotPermission
      elif status == 429:
        return self._roles
      else: _.raise_for_status()
    self._roles = (Role(self, elem) for elem in json.loads(text))
    return self._roles
  @property
  def members(self) -> Generator[Member, None, None]:
    after = 0
    while True:
      with Route(API, headers=auth) as router:
        status, rate_limit, text, _ = router.get(f'/guilds/{self.id}/members?after={after}&limit=1000', call=lambda res: (res.status_code, res.headers.get("x-next-cursor"), res.text, res))
        if not status == 200:
          if status == 429:
            return self._members
          _.raise_for_status()
        for elem in json.loads(text):
          yield Member(self, elem)
        after = rate_limit
        if rate_limit is None:
          break
  def get_role(self, /, id: int) -> Union[Role, None]:
    return find(self.roles, lambda role: role.id == id, None)
  def get_member(self, /, id: int) -> Union[Member, None]:
    return find(self.members, lambda member: member.id == id, None)