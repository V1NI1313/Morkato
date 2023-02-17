import json
import os

### -> types <- ###
from .types.etc import Settings

local_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(f'{local_dir}/../../settings.json'), 'r', encoding='utf-8') as fp:
  settings: Settings = json.load(fp)

access_token = settings['api']['access_token']
