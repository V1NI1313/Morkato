from .etc import UtilzApiError as Error

class GuildErrors(Error): ...
class GuildNotExists(GuildErrors):
  def __init__(self) -> None:
    super().__init__("Guild not exists.")