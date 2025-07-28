



class Jar:
    def __init__(self, capacity=12):
        self._capacity  =  capacity
        self._size = 0

        if self._capacity < 0:
            raise ValueError("Below capacity")

    def __str__(self):
        return self._size * '🍪'

    def deposit(self, n):
        self._size += n


    def withdraw(self, n):
        self._size -= n


    @property
    def capacity(self):
        return self._capacity



    @property
    def size(self):
        return self._size

    @size.setter
    def size(self, size):
        if size < 0:
            raise ValueError('Invalid Scope of cookies')
        if size > self.capacity:
            raise ValueError('Invalid scope of cookies')
        self._size = size



jar = Jar()
print(jar)





