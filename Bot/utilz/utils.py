from typing import Iterable, Callable, Optional, Generator, TypeVar, Union, overload

T = TypeVar('T')

def findAll(iterable: Iterable[T], /, callback: Callable[[T], bool]) -> Generator[T, None, None]:
  return (elem for elem in iterable if callback(elem))
@overload
def find(iterable: Iterable[T], /, callback: Callable[[T], bool]) -> T: ...
@overload
def find(iterable: Iterable[T], /, callback: Callable[[T], bool], default: Optional[T]=None) -> Union[T, None]: ...
def find(iterable: Iterable[T], /, callback: Callable[[T], bool], default: Optional[T]=None) -> Union[T, None]:
  return next(findAll(iterable, callback), default)
def filter(iterable: Iterable[T], /, callback: Callable[[T], bool]) -> Iterable[T]:
  return (elem for elem in iterable if callback(elem))
def reversefilter(iterable: Iterable[T], /, callback: Callable[[T], bool]) -> Iterable[T]:
  return (elem for elem in iterable if not callback(elem))