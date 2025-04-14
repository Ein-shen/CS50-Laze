from bank import value

def main():
    test_0_value()
    test_20_value()




def test_0_value():
    assert value("hello") == "$0"
    assert value("hello, newman") == "$0"
    assert value( "hello there") ==  "$0"



if __name__ == "__main__":
    main()
