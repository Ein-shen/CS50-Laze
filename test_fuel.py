import pytest
from fuel import convert, gauge



def main():
    test_convert()
    test_gauge()
    test_ValueError()
    test_ZeroError()



def test_convert():

    assert convert("1/100") == 1
    assert convert("1/1") == 100
    assert convert("3/4") == 75


def test_gauge():
    assert gauge(99) == "F"
    assert gauge(1) == "E"
    assert gauge(100) == "F"
    assert gauge(50) == "50%"

def test_ValueError():
     with pytest.raises(ValueError):
        convert("cat/dog")
        
     with pytest.raises(ValueError):
        convert("2/1")


def test_ZeroError():
     with pytest.raises(ZeroDivisionError):
        convert("1/0")

if __name__ == "__main__":
    main()
