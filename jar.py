



class Jar:
    def __init__(self, capacity=12):
        self._capacity  =  capacity
        self._size = 0

        if self._capacity < 0:
            raise ValueError('Below capacity')


    def __str__(self):
        return self._size * '🍪'

    def deposit(self, n):
        self._size += n


    def withdraw(self, n):
        self._size -= n

    @property
    def size(self):
        return self._size

    @size.setter
    def size(self, value):
          if value > self._capacity:
            raise ValueError ('It exceeds the maximum capacity')
          if value < 0:
              raise ValueError('Irrational numbers are not valid in the capacity')






    @property
    def capacity(self):
        return self._capacity

    @capacity.setter
    def capacity(self, value):
        if value < 0:
            raise ValueError ("Capacity cannot be negative")





jar = Jar()

jar.deposit(13)
jar.withdraw(0)
print(jar)





