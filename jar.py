



class Jar:
    def __init__(self, capacity=12):
        self._capacity  =  capacity
        self._size = 0

        if self._capacity < 0:
            raise ValueError('Below minimum capacity')


    def __str__(self):
        return  '🍪' * self._size

    def deposit(self, n):
        if self._size + n > self._capacity:
            raise ValueError('Your cookies exceed the capacity inside')
        elif n > self.capacity:
            raise ValueError('Your cookies exceed maximun capacity')
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


print(jar)





