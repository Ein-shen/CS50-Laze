from bank import value

def main():
    test_0_value()
    test_20_value()
    test_100_value()
    test_invalid_value()




def test_0_value():
    assert value("hello") == "$0"
    assert value("hello, newman") == "$0"
    assert value( "hello there") ==  "$0"

def test_20_value():
    assert value("how you doing?") == "$20"
    assert value("hey") == "$20"

def test_100_value():
    assert value("what's happening?") == "$100"
    assert value("what's up?") == "$100"

def test_invalid_value():
    assert value("invalid input") == "invalid input"

if __name__ == "__main__":
    main()
