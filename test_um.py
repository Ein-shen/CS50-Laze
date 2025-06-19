from um import count




def main():
    test_count_1_valid_um()
    test_count_2_valid_um()


def test_count_1_valid_um():
    assert count('um') == 1
    assert count('Hello, um, world') == 1
    assert count('This is, um... CS50.') == 1
    assert count('Um... what are regular expressions?') == 1

def test_count_2_valid_um():
    assert count('Um, thanks, um, regular expressions make sense now.') == 2
    assert count('Um? Mum? Is this that album where, um, umm, the clumsy alums play drums?') == 2
