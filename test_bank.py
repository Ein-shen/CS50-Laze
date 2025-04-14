from bank import value

def main():
    test_0_value()
    test_20_value()
    test_100_value()
    test_else()




def test_0_value():
    assert value("hello") == 0
    assert value("HELLO") == 0
    assert value("HeLLo") == 0


def test_20_value():
    assert value("h") == 20
    assert value("H") == 20


def test_100_value():
    assert value("shiever") == 100
    assert value("sHy") == 100

def test_else():
    assert value("sasasasa") == 0
    assert value("KAKAKKA") == 0





if __name__ == "__main__":
    main()
