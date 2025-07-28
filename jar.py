



class Jar:
    def __init__(self, capacity=12):
        self._capacity  =  capacity
        self._size = 0

        if self.capacity < 0:
            raise ValueError("Below capacity")
        
        if self._size < 0:
            raise ValueError("No cookie")

        if self.capacity > self.size :
            raise ValueError("Too much cookies")



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


jar = Jar()
jar.deposit(3)
jar.withdraw(2)
print(jar)





