from decouple import config

auth = {
  "authorization": f'Bot {config("CLIENT_TOKEN")}'
}
