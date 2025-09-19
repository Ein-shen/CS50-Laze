
import pytest
from project import past_status, f_name, questions, old

def main():


    test_tragedy_died_status()
    test_name()
    test_ValueError()



def test_name():
    assert f_name("Shen") == "In your past life, Shen"
    assert questions("Chess") == "Chess"
    assert old(12) == 12


def test_ValueError():

    with pytest.raises(ValueError):
        f_name('123456789')

    with pytest.raises(ValueError):
        f_name('Sa')

    with pytest.raises(ValueError):
        f_name('Andrew 12')

    with pytest.raises(ValueError):
        f_name('')

    with pytest.raises(ValueError):
        old(121)

    with pytest.raises(ValueError):
        old(0)

    with pytest.raises(ValueError):
        old("sda")

    with pytest.raises(ValueError):
        questions('AKSSHHShayinskawd')

    with pytest.raises(ValueError):
        questions('123')

    with pytest.raises(ValueError):
        questions('')



def test_tragedy_died_status():

    status = ["Leader tribe",  "Emperor", "Royal Guard",
              "Quenn", "Slave", "Magician","King",
              "Villager", "Explorer", "Prince",
              "Princess", "Mermaid","Butler"]


    cause_of = ["Food poisoning", "Plauge", "Old age",
                        "Heart attack", "Public execusion",
                        "assasination", "ambushed", "War", "torture"]

    reign = ["405 years", "30 years", "90 years",
             "47 years", "23 years", "210 years",
             "55 years", "13 years", "100 years"]


    match  = False
    rein = past_status()
    assert "you were a" in rein
    for i in status:
        if rein.endswith(i):
            match = True
        break

    match = False
    happ = past_status()
    assert "and your cause of death is" in happ
    for d in cause_of:
        if happ.endswith(d):
            match = True

    match =  False
    liv = past_status()
    assert "you lived" in liv
    for a in reign:
        if liv.endswith(a):
            match = True





















