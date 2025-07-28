



class Jar:
    def __init__(self, capacity=12):
        self._capacity  =  capacity
        self._size = 0

        if self._capacity < 0:
            raise ValueError("Below capacity")

    def __str__(self):
        return self._size * '🍪'

    def deposit(self, n) -> None:
        self._size += n


    def withdraw(self, n) -> None:
        self._size -= n


    @property
    def capacity(self)-> int:
        return self._capacity

    @capacity.setter
    def capacity(self,capacity: int) -> None:
        if capacity < 0:
            raise ValueError("Invalid capacity of the jar")
        self._capacity = capacity



    @property
    def size(self) -> int:
        return self._size

    @size.setter
    def size(self, size:int) -> None:
        if size < 0:
            raise ValueError('Invalid Scope of cookies')
        if size > self.capacity:
            raise ValueError('Invalid scope of cookies')
        self._size = size



jar = Jar()
print(jar)





