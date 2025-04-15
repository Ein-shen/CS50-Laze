from plates import is_valid

def main():
    test_check_if_valid()
    test_check_Input_Invalid()
    test_check_Numeric_Invalid()
    test_check_Punctuation_Invalid()




def test_check_if_valid():
    assert is_valid('CS50') == True
    assert is_valid('ECTO88') == True
    assert is_valid('NRVOUS') == True


def test_check_Input_Invalid():
    assert is_valid('') == False

def test_check_Numeric_Invalid():
    assert is_valid('123456789') == False

def test_check_Punctuation_Invalid():
    assert is_valid('.,?!') == False
    
def test_check_Alphabetical():
    assert is_valid('Cs50') == False



if __name__ == "__main__":
    main()
