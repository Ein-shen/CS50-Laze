from jar import Jar


def test_init():
    jar = Jar()

    assert jar.capacity


def test_str():
    jar = Jar()
    assert str(jar) == ""
    jar.deposit(1)
    assert str(jar) == "🍪"
    jar.deposit(11)
    assert str(jar) == "🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪"


def test_deposit():
    jar = Jar()
    jar.deposit(4)

    assert jar.size == 4


def test_withdraw():
    jar = Jar()
    jar.deposit(8)
    jar.withdraw(3)

    assert jar.size == 5
