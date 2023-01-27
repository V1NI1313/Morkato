from __future__ import annotations

from typing import TypedDict, Union, TYPE_CHECKING
from utilz import Route, auth
import json

if TYPE_CHECKING:
  from . import Guild
### -> Exceptions <- ###
from .errors import (
  utilsErrorGeneric,
  NotPermission as UserNotPermission
)

APICDN = 'https://cdn.discordapp.com/'
API = 'https://discord.com/api/v6'

class UserNotExists(utilsErrorGeneric):
  def __init__(self) -> None:
    super().__init__(f'User Not Exists.')

class TypedUser(TypedDict):
  username: str
  id: int
  discriminator: str
  avatar: Union[str, None]
class User:
  def __init__(self, data: TypedUser) -> None:
    self.name: str = data['username']
    self.id: int = int(data['id'])
    self.discriminator: str = data['discriminator']
    self._avatar = data['avatar']
  def __repr__(self) -> str:
    return f'{self.name}#{self.discriminator}'
  @classmethod
  def from_id(cls, id: int) -> User:
    with Route(API, headers=auth) as router:
      status, text = router.get(f'/users/{id}', call=lambda res: (res.status_code, res.text))
      if not status == 200:
        if status in (401, 403, 422):
          raise UserNotPermission
        else:
          raise UserNotExists
      return cls(json.loads(text))
  @property
  def avatar(self) -> bytes:
    with Route(APICDN) as router:
      return router.get(f'/avatars/{self.id}/{self._avatar}.webp', call=lambda res: res.content)
  def avatar_as(self, size: int) -> bytes:
    with Route(APICDN) as router:
      return router.get(f'/avatars/{self.id}/{self._avatar}.webp?size={size}', call=lambda res: res.content)