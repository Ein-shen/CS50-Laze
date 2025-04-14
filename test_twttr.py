from twttr import shorten

def main():
    test_change_word()
    test_numerics()
    test_punctuations()




def test_change_word():
    assert shorten('twitter') == 'twttr'
    assert shorten('TWITTER') == 'TWTTR'
    assert shorten('TwiTtEr') == 'TwTtr'


def test_numerics():
    assert shorten('123456789') == '123456789'
    

def test_punctuations():
    assert shorten('?!,.></') == '?!,.></'

if __name__ == "__main__":
    main()
