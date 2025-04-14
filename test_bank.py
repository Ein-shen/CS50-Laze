from bank import value

def main():
    test_0_value()
    """test_20_value()
    test_100_value()

"""



def test_0_value():
    assert value("hello") == 0
    assert value("HELLO") == 0
    assert value("HeLLo") == 0


def test_20_value():
    assert value("h") == 20
    assert value("H") == 20


def test_100_value():
    assert value("What's up") == 100







if __name__ == "__main__":
    main()
