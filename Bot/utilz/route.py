from typing import Optional, Callable, TypeVar, Union, overload, Any
import requests

T = TypeVar('T')

class Route:
  def __init__(self, url: str, headers: Optional[dict[str, str]]=None) -> None:
    self.url = url
    self.headers = headers or {}
    self.session = requests.Session()
    self.cache: dict[str, requests.Response] = {}
  def __enter__(self):
    return self
  def __exit__(self, exc_type, exc_val, exc_tb) -> None:
    return self.session.close()
  def __request(
    self, *,
    method: str,
    call: Optional[Callable[[requests.Response], T]]=None,
    local: str, headers: dict,
    json: Optional[dict]=None,
    cache: Optional[dict]=None,
    params: Optional[dict]=None
  ) -> Union[requests.Response, T]:
    if not json is None:
      response =  self.session.request(method=method, url=f"{self.url}{local}", headers=headers, json=json, params=(params or {}))
    else:
      response =  self.session.request(method=method, url=f"{self.url}{local}", headers=headers, params=(params or {}))
    if not cache is None:
      cache[f"{method.lower()}@{local}"] = response
    if callable(call):
      return call(response)
    return response
  def request(
    self,
    method: str,
    local: str,
    call: Optional[Callable[[requests.Response], Any]]=None,
    in_cache: bool=False,
    use_cache: bool=False,
    headers: Optional[dict[str, str]]=None,
    json: Optional[dict[str, Any]]=None,
    params: Optional[dict]=None
  ) -> requests.Response:
    if not use_cache:
      cache = self.cache.pop(f"{method.lower()}@{local}", None)
    else:
      cache = self.cache.get(f"{method.lower()}@{local}")
    if not cache is None:
      if callable(call):
        return call(cache)
      return cache
    assert (isinstance(headers, dict) or headers is None), f'Not \"headers\" support type {type(headers).__name__}' 
    assert (isinstance(json, dict) or json is None), f'Not \"json\" support type {type(json).__name__}'
    return self.__request(method=method, call=call, local=local, headers={**self.headers, **(headers or {})}, json=json, cache=(self.cache if in_cache else None), params=params)
  def get(
    self,
    local: str,
    call: Optional[Callable[[requests.Response], T]]=None,
    headers: Optional[dict[str, str]]=None, *,
    in_cache: bool=True,
    params: Optional[dict]=None
  ) -> Union[requests.Response, T]:
    return self.request("GET", local, call, headers=headers, in_cache=in_cache, params=params)
  def post(
    self,
    local: str,
    call: Optional[Callable[[requests.Response], T]]=None,
    headers: Optional[dict[str, str]]=None,
    json: Optional[dict[str, Any]]=None, *,
    in_cache: bool=False
  ) -> Union[requests.Response, T]:
    return self.request("POST", local, call, headers=headers, json=json, in_cache=in_cache)
  def patch(
    self,
    local: str,
    call: Optional[Callable[[requests.Response], T]]=None,
    headers: Optional[dict[str, str]]=None,
    json: Optional[dict[str, Any]]=None, *,
    in_cache: bool=False
  ) -> Union[requests.Response, T]:
    return self.request("PATCH", local, call, headers=headers, json=json, in_cache=in_cache)
  def delete(
    self,
    local: str,
    call: Optional[Callable[[requests.Response], T]]=None,
    headers: Optional[dict[str, str]]=None, *,
    in_cache: bool=False
  ) -> Union[requests.Response, T]:
    return self.request("DELETE", local, call, headers=headers, in_cache=in_cache)

secret = {"authorization": "Bot secret@çaiergnisrekh4ea.kgoekp033424243,dlofkjoe3=-=pd-elf-e03m0f-"}