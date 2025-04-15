from plates import is_valid

def main():
    test_check_if_valid()



def test_check_if_valid():
    assert is_valid('CS') == True
    assert is_valid('ABCDEF') == True
    assert is_valid('M') == False
    assert is_valid('LKASNIS') == False


def test_check_aplabet():
    assert is_valid('CS50') == True
    assert is_valid('CS05') == False
if __name__ == "__main__":
    main()
