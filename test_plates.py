from plates import is_valid


def main():
    test_check_if_valid()
    test_check_zeroplacement()
    test_check_starts_letters()
    test_check_punctuations()
    test_check_number_placement()


def test_check_if_valid():
    assert is_valid("Z") == False
    assert is_valid("QRSTUVW") == False
    assert is_valid("YX") == True
    assert is_valid("ABCDEF") == True


def test_check_zeroplacement():
    assert is_valid("CS50") == True
    assert is_valid("CS05") == False


def test_check_starts_letters():
    assert is_valid("C2") == False
    assert is_valid("AB") == True
    assert is_valid("8T") == False
    assert is_valid("22") == False


def test_check_punctuations():
    assert is_valid("NERVO.8S") == False
    assert is_valid("INVAL!D") == False


def test_check_number_placement():
    assert is_valid("AB0123") == False
    assert is_valid("ABC12D") == False
    assert is_valid("ABC123") == True


if __name__ == "__main__":
    main()
