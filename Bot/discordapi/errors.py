class utilsErrorGeneric(Exception): ...
class NotPermission(utilsErrorGeneric):
  def __init__(self) -> None:
    super().__init__("You don't have the necessary permissions to perform this action.")