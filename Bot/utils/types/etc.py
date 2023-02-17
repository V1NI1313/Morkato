from typing import TypedDict, Union, List, Dict

class ErrorSettings(TypedDict):
  status: int
  message: str

class BaseSettingsExceptions(TypedDict):
  notExists: ErrorSettings
  alreadyExists: ErrorSettings

class BaseSettingsExceptions(TypedDict):
  body: ErrorSettings
  joiError: ErrorSettings
  notAccess: ErrorSettings
  botNotInGuild: ErrorSettings

class SettingsGuild(TypedDict):
  arq: str

  exceptions: BaseSettingsExceptions

class Resp(TypedDict):
  local: str
  form_local: str

  exceptions: BaseSettingsExceptions

class ApiSettings(TypedDict):
  access_token: str

  exceptions: BaseException
  guilds: SettingsGuild
  respirations: Resp
  kekkijutsus: Resp

class Settings(TypedDict):
  token: str
  url: str
  
  api: ApiSettings

Json = Union[List[Union[Dict[str, Union[str, int, float, bool, None]], str, int, float, bool, None]], Dict[str, Union[str, int, float, bool, None]]]
Json = Union[List[Union[Dict[str, Union[Json, str, int, float, bool, None]], str, int, float, bool, None]], Dict[str, Union[Json, str, int, float, bool, None]]]
