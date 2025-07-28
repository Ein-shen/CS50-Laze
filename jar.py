



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
            raise ValueError('Your cookies exceed maximun capacity')
        elif n > self.capacity:
            raise ValueError('Your cookies exceed maximun capacity')
        self._size += n


    def withdraw(self, n):
        if  self._size < n:
            raise ValueError('Cannot withdraw, there is no enough cookie in the deposit')
        self._size -= n

    @property
    def size(self):
        return(self._size)


    @property
    def capacity(self):
        return(self._capacity)



jar = Jar()
print(jar)





