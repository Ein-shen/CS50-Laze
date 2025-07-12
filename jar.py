













class Jar:
    def __init__(self, number, capacity=12):
        self.number = number
        self.capacity = capacity

    def __str__(self):
        ...

    def deposit(self, n):
        ...

    def withdraw(self, n):
        ...

    @property
    def capacity(self):
        ...

    @property
    def size(self):
        ...


def main():
    ...


