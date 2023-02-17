from discord import Guild as discordGuild
from .route import ( Route, Response )
from .Guild_utils import GuildBase
from .etc import access_token

### -> types and exceptions <- ###
from .exceptions import GuildNotExists

class Guild(GuildBase):
  """
    |coro| Objeto para tratar os jsons da API de forma dinâmica.

    :param guild: objeto ``discord.Guild`` serve para auxiliar e facilitar funções.
    :param data: objeto ``.type.Guild`` serve para montar as informações da class.

    Métodos:

    - request_element(self, element: str, *, json: Optional[dict[str, Any]=None]): Obtém, cria, edita ou deleta um elemento a partir de dois objetos ``str``.
    - get_element(self, element: str, *, json: Optional[dict[str, Any]=None]): Obtém um elemento ``Guild`` a partir do objeto ``str``.
    - post_element(self, element: str, *, json: Optional[dict[str, Any]=None]): Obtém ou Cria um elemento a partir do objeto ``str`` e ``json``.
    - patch_element(self, element: str, *, json: Optional[dict[str, Any]=None]): Obtém ou Edita um elemento a partir do objeto ``str`` e ``json``.
    - delete_element(self, element: str, *, json: Optional[dict[str, Any]]=None): Deleta um elemento a partir do objeto ``str`` e ``json``

  """
  
  pass


def get(g: discordGuild) -> Guild:
  """
    Obtém a Guild a partir de um objeto discord.Guild.
    
    :param guild: objeto discord.Guild que representa a Guild a ser buscada na API.
    
    Exceções:
    
    - GuildNotExists: lançada caso a Guild não esteja registrada na API.
    - HTTPError: lançada caso ocorra um erro na comunicação com a API.
    
    Exemplos de uso:
    
    >>> guild = (commands.Context.guild)
    >>> guild = (discord.Interaction.guild)
    >>> guild = (discord.Guild(...))
  """
  
  def check(res: Response) -> Guild:
    if not res.status_code == 200:
      if res.status_code == 404:
        raise GuildNotExists
      res.raise_for_status()  
    return Guild(
      ep=g,
      g=res.json()
    )
  with Route('http://localhost:5500', headers={ 'authorization': access_token }) as router:
    return router.get(f'/desktop/Guilds/{g.id}', call=check)