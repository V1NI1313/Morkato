from typing import Optional, Callable, TypeVar, Union, overload, Any
from requests import Response, Session, HTTPError

T = TypeVar('T')

class Route(Session):
  def __init__(self, url: str, headers: dict[str, Union[str, bytes]]) -> None:
    super().__init__()
    self.url = url
    self.headers = headers or {}
  @overload
  def request(
    self,
    method: str | bytes,
    local: str, *,
    call: Callable[[Response], T],
    params: dict | None = ...,
    data: str | None = ...,
    headers: dict[str, Union[str, bytes]] | None = ...,
    json: dict | None = ...,
    **kwgs
  ) -> T: ...
  @overload
  def request(
    self,
    method: str | bytes,
    local: str, *,
    params: dict | None = ...,
    data: str | None = ...,
    headers: dict[str, Union[str, bytes]] | None = ...,
    json: dict | None = ...,
    **kwgs
  ) -> Response: ...
  def request(self, method: str | bytes, local: str, call: Optional[Callable[[Response], T]], **kwgs) -> Union[Response, T]:
    kwgs['headers'] = {**kwgs.get('headers', {}), **self.headers}
    if callable(call):
      return call(super().request(method=method, url=f"{self.url}{local}", **kwgs))
    return super().request(method=method, url=f"{self.url}{local}", **kwgs)
  @overload
  def get(self, local: str, *, call: Callable[[Response], T], params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> T: ...
  @overload
  def get(self, method: str | bytes, local: str, *, params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> Response: ...
  def get(self, local: str, **kwgs) -> Union[Response, T]:
    return self.request("GET", local, **kwgs)
  @overload
  def post(self, local: str, *, call: Callable[[Response], T], params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> T: ...
  @overload
  def post(self, method: str | bytes, local: str, *, params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> Response: ...
  def post(self, local: str, **kwgs) -> Union[Response, T]:
    return self.request("POST", local, **kwgs)
  @overload
  def patch(self, local: str, *, call: Callable[[Response], T], params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> T: ...
  @overload
  def patch(self, method: str | bytes, local: str, *, params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> Response: ...
  def patch(self, local: str, **kwgs) -> Union[Response, T]:
    return self.request("PATCH", local, **kwgs)
  @overload
  def delete(self, local: str, *, call: Callable[[Response], T], params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> T: ...
  @overload
  def delete(self, method: str | bytes, local: str, *, params: dict | None = ..., data: str | None = ..., headers: dict[str, Union[str, bytes]] | None = ..., json: dict | None = ..., **kwgs) -> Response: ...
  def delete(self, local: str, **kwgs) -> Union[Response, T]:
    return self.request("DELETE", local, **kwgs)