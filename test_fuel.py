import pytest
from fuel import convert, gauge



def main():
    test_convert()
    test_gauge()
    test_ValueError()
    test_ZeroError()



def test_convert():
    assert convert("3/4") == 75
    assert convert("1/1") == 100
    assert convert("1/100") == 1
   


def test_gauge():
    assert gauge(99) == "F"
    assert gauge(1) == "E"
    assert gauge(100) == "F"
    assert gauge(50) == "50%"


def test_ValueError():
     with pytest.raises(ValueError):
        convert("98/1")

     with pytest.raises(ValueError):
        convert("Duterte/Aquino")



def test_ZeroError():
     with pytest.raises(ZeroDivisionError):
        convert("50/0")

if __name__ == "__main__":
    main()
