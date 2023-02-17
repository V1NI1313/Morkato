class UtilzApiError(Exception): ...

class NotParams(UtilzApiError):
  def __init__(self) -> None:
    super().__init__("Not params.")