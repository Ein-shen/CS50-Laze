from fuel import convert, gauge



def main():
    test_convert()
    test_gauge()



def test_convert():

    assert convert("1/100") == 1
    assert convert("1/1") == 100
    assert convert("3/4") == 75


def test_gauge():
    assert gauge(1) == "E"      
    assert gauge(100) == "F"
    assert gauge(50) == "50%"

if __name__ == "__main__":
    main()
