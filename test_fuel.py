from fuel import convert, gauge




def main():
    test_convert()
    test_gauge()



def test_convert():
    assert convert("Shen") == False
    assert convert("@#$%") == False
    assert convert("0") == True
    assert convert("100") == True



def test_gauge():
    assert gauge("1") == True
    assert gauge("100") == True
    assert gauge("99") == True
    assert gauge("0") == True
    assert gauge("12") == True



if __name__ == "__main__":
    main()
