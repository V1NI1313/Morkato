from discord.ext import commands
from types import ModuleType
import traceback
import asyncio
import re

re_code = re.compile(r'```(?P<lang>[^\s]+)\n(?P<code>.+?)```', re.DOTALL)

class Commands(commands.Cog):
  def __init__(self, bot: commands.Bot) -> None:
    self.bot: commands.Bot = bot
  @commands.command(name='console')
  async def Console(self, ctx: commands.Context, *, code: str) -> None:
    if ctx.author.id == 510948690354110464:
      pattern = re_code.match(code.strip())
      lang, exec_code = pattern['lang'], pattern['code']
      if lang in ['python', 'py']:
        compiled_code = compile(exec_code, 'main.py', 'exec')
        module = ModuleType('main')
        try: exec(compiled_code, module.__dict__)
        except Exception as err:
          traceback.print_exc()
        if hasattr(module, 'setup') and asyncio.iscoroutinefunction(module.setup):
          try: await module.setup(ctx)
          except Exception as err:
            traceback.print_exc()
        return
      else:
        await ctx.send('**Não sei interpretar essa linguagem T,_T**'); return
    await ctx.send('Para você, em breve...')
async def setup(bot: commands.Bot):
  await bot.add_cog(Commands(bot))