from discord.ext import commands
from decouple import config
import discord
import glob

class MyBot(commands.Bot):
  def __init__(self) -> None:
    super().__init__(
      command_prefix='!',
      intents=discord.Intents.all(),
      case_insensitive=True
    )
  async def on_ready(self) -> None:
    print(f'Estou conectado, como : {self.user}')
  async def setup_hook(self) -> None:
    await self.load_extension(f"Commands.Commands")
bot = MyBot()
TOKEN: str = config('CLIENT_TOKEN')
bot.run(TOKEN)