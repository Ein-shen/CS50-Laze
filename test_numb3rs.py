from numb3rs import validate


def main():

    #calling the function
    test_false_return()
    test_true_return()

#testing  the return false
def test_false_return():
    assert validate("64.128.256.512") == False
    assert validate("8.8.8") == False
    assert validate("10.10.10.10.10") == False
    assert validate("2001:0db8:85a3:0000:0000:8a2e:0370:7334") == False
    assert validate("cat") == False



#testing  the return true
def test_true_return():
    assert validate("127.0.0.1") == True
    assert validate("255.255.255.255") == True
    assert validate("140.247.235.144") == True

