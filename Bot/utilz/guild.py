from .route import Route, secret
from discord import Guild as discordGuild
### -> types and exceptions <- ###
from .types import Guild as TypedGuild
from .exceptions import GuildNotExists

class Guild:
  def __init__(
    self,
    guild: discordGuild,
    data: TypedGuild
  ) -> None:
    self.guild = guild
    self.data = data
  def __repr__(self) -> str:
    return self.guild.__repr__()
def get(guild: discordGuild) -> Guild:
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
  with Route('http://localhost:5500', headers=secret) as router:
    status, json, _ = router.get(f'/desktop/Guilds/{guild.id}', lambda res: (res.status_code, res.json(), res), in_cache=False)
  if not status == 200:
    if status == 404:
      raise GuildNotExists()
    _.raise_for_status()
  return Guild(
    guild=guild,
    data=json
  )
