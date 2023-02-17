from typing import ( Optional, Callable, TypeVar, Union, overload )
from discord.guild import Guild as discordGuild
from .route import ( Route, Response )
from .etc import access_token

### -> types <- ###
from .types.Guild import Guild as TypedGuild, Settings
from .types import Json

T = TypeVar('T')
LOCALAPI = "http://localhost:5500"

class GuildPayload:
  def __init__(self, ep: discordGuild, g: TypedGuild) -> None:
    self.id: int = int(g['id'])
    self.settings: Settings = g['settings']

    self.ep: discordGuild = ep
  @overload
  def request_element(
    self, method: str, element: str, *,
    json: Optional[Json]=None,
    call: Callable[[Response], T]) -> T: ...
  @overload
  def request_element(
    self, method: str, element: str, *,
    json: Optional[Json]=None) -> Union[Json, str]: ...
  def request_element(
    self,
    method: str,
    element: str, *,
    json: Optional[Json]=None,
    call: Optional[Callable[[Response], T]]=None
  ) -> Union[Json, T]:
    """
      Obtém, cria, edita ou deleta um elemento a partir de dois objetos ``str``.

      :param method: objeto ``str`` que representa o método de requisição do elemento na API.
      :param element: objeto ``str`` que representa o nome do elemento para buscar na API.
      :Optional[param] json: objeto ``json`` que representa os dados para serem enviados.

      Exceções:

      - AssertionError: Lançada caso o parâmetro ``json`` seja um tipo não suportado pela API.
      - HTTPError: Lançada caso ocorra um erro na comunicação com a API.

      Exemplos de uso:

      >>> guild = utilz.Guild(...)
      >>> element = guild.request_element("GET", "/Hability")
      >>> element = guild.request_element("POST", "/Hability", json={'name': "foo", role: "{DISCORD_ROLE}", "rarity": 0, "require": 1})
      >>> element = guild.request_element("PATCH", "/Hability/{ID}", json={'name': "oof"})
      >>> element = guild.request_element("DELETE", "/Hability/{ID}")
    """
    
    if not callable(call):
      def check(res: Response) -> Union[Json, str]:
        if not res.status_code == 200:
          res.raise_for_status()
        try: return res.json()
        except: return res.text
      call = check
    assert not json is None or not isinstance(json, (dict, list)), "Json type not support."
    args = {'method': method, 'local': element, 'call': call, **({'json': json} if not json is None else {})}
    with Route(f'http://localhost:5500/desktop/Guilds/{self.id}', headers={ 'authorization': access_token }) as router:
      return router.request(**args)
  @overload
  def get_element(self, element: str, *, json: Optional[Json]=None) -> Json: ...
  @overload
  def get_element(self, element: str, *, json: Optional[Json], call: Callable[[Response], T]) -> T: ...
  def get_element(self, element: str, *, json: Optional[Json]=None, call: Optional[Callable[[Response], T]]=None) -> Union[Json, str, T]:
    """
      Obtém um elemento a partir do objeto ``str``.

      :param element: Objeto str que representa o nome do elemento para buscar na API.
      :Optional[param] json: objeto ``json`` que representa os dados para serem enviados.

      Exceções:

      - AssertionError: Lançada caso o parâmetro ``json`` seja um tipo não suportado pela API.
      - HTTPError: Lançada caso ocorra um erro na comunicação com a API.

      Exemplos de uso:

      >>> guild = utilz.Guild(...)
      >>> element = guild.get_element("/Hability")
    """
    
    return self.request_element("GET", element=element, json=json, call=call)
  @overload
  def post_element(self, element: str, *, json: Optional[Json]=None) -> Union[Json, str]: ...
  @overload
  def post_element(self, element: str, *, json: Optional[Json]=None, call: Callable[[Response], T]) -> T: ...
  def post_element(self, element: str, *, json: Optional[Json]=None, call: Optional[Callable[[Response], T]]=None) -> Union[Json, str, T]:
    """
      Obtém ou Cria um elemento a partir do objeto ``str`` e ``json``.

      :param element: Objeto str que representa o nome do elemento para buscar na API.
      :Optional[param] json: objeto ``json`` que representa os dados para serem enviados.

      Exceções:

      - AssertionError: Lançada caso o parâmetro ``json`` seja um tipo não suportado pela API.
      - HTTPError: Lançada caso ocorra um erro na comunicação com a API.

      Exemplos de uso:

      >>> guild = utilz.Guild(...)
      >>> element = guild.post_element("/Hability", json={'name': "foo", role: "{DISCORD_ROLE}", "rarity": 0, "require": 1})
    """

    return self.request_element("POST", element=element, json=json, call=call)
  @overload
  def patch_element(self, element: str, *, json: Optional[Json]=None) -> Union[Json, str]: ...
  @overload
  def patch_element(self, element: str, *, json: Optional[Json]=None, call: Callable[[Response], T]) -> T: ...
  def patch_element(self, element: str, *, json: Optional[Json]=None, call: Optional[Callable[[Response], T]]=None) -> Union[Json, str, T]:
    """
      Obtém ou Edita um elemento a partir do objeto ``str`` e ``json``.

      :param element: Objeto str que representa o nome do elemento para buscar na API.
      :Optional[param] json: objeto ``json`` que representa os dados para serem enviados.

      Exceções:

      - AssertionError: Lançada caso o parâmetro ``json`` seja um tipo não suportado pela API.
      - HTTPError: Lançada caso ocorra um erro na comunicação com a API.

      Exemplos de uso:

      >>> guild = utilz.Guild(...)
      >>> element = guild.patch_element("/Hability/{ID}", json={'name': "oof"})
    """

    return self.request_element("PATCH", element=element, json=json, call=call)
  @overload
  def delete_element(self, element: str, *, json: Optional[Json]=None) -> Union[Json, str]: ...
  @overload
  def delete_element(self, element: str, *, json: Optional[Json]=None, call: Callable[[Response], T]) -> T: ...
  def delete_element(self, element: str, *, json: Optional[Json]=None, call: Optional[Callable[[Response], T]]=None) -> Union[Json, str, T]:
    """
      Deleta um elemento a partir do objeto ``str`` e ``json``

      :param element: Objeto str que representa o nome do elemento para buscar na API.
      :Optional[param] json: objeto ``json`` que representa os dados para serem enviados.

      Exceções:

      - AssertionError: Lançada caso o parâmetro ``json`` seja um tipo não suportado pela API.
      - HTTPError: Lançada caso ocorra um erro na comunicação com a API.

      Exemplos de uso:

      >>> guild = .Guild(...)
      >>> element = guild.get_element("/Hability/{ID}")
    """

    return self.request_element("DELETE", element=element, json=json, call=call)

class GuildBase(GuildPayload):
  def __repr__(self) -> str:
    return self.ep.name
  
