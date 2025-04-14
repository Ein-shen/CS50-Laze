from bank import value

def main():
    test_0_value()
    test_20_value()
    test_100_value()
    



def test_0_value():
    greetings = ["hello", "hello, newman", "hello there"]
    for greeting in greetings:
        assert value(greeting) == "$0"

def test_20_value():
   greetings =  ["how you doing?", "hey"]
   for greeting in greetings:
        assert value(greeting) == "$20"

def test_100_value():
    greetings =  ["what's happening?", "what's up?"]
    for greeting in greetings:
        assert value(greeting) == "$100"



if __name__ == "__main__":
    main()
