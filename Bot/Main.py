from discord.ext import commands
from glob import glob
import discord
import utils

class MyBot(commands.Bot):
  def __init__(self) -> None:
    super(commands.Bot, self).__init__(
      command_prefix='t!',
      case_insensitive=True,
      intents=discord.Intents.all() 
    )
  async def on_ready(self) -> None:
    print(f'Estou conectado, como : {self.user}')
  async def on_message(self, message: discord.Message, /) -> None:
    return await self.process_commands(message)
  async def on_message_edit(self, after: discord.Message, before: discord.Message, /) -> None:
    return await self.process_commands(before)
  async def setup_hook(self) -> None:
    for file in glob('Commands/*.py'):
      await self.load_extension(file.replace('/', '.')[:-3])

bot = MyBot()
bot.run(utils.settings['token'])