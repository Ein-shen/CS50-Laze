import random


def main():
    level = get_level()
    score = printing_score(level)
    print("Score:", score)



def get_level():
    while True:
        try:
            level = int(input("Level: "))
            if level in [1, 2, 3]:
                return level

        except (ValueError, UnboundLocalError):
            pass




def generate_integer(level):
    if level == 1:
        x = random.randint(0, 9)
        y = random.randint(0, 9)
    elif level == 2:
        x = random.randint(10, 99)
        y = random.randint(10, 99)
    else:
        x = random.randint(100, 999)
        y = random.randint(100, 999)
    return x, y


def adding(x, y):
    retrying = 1
    while retrying <= 3:
        try:
            add = int(input(f"{x} + {y} = "))
            if add == (x + y):
                return True
            else:
                retrying += 1
                print("EEE")

        except ValueError:
            retrying += 1
            print("EEE")

    print(f"{x} + {y} = {x + y}")
    return False


def printing_score(level):
    levelpass = 3
    score = 0
    add = 0
    while levelpass <= 10:
        x, y = generate_integer(level)
        checker = adding(x, y)
        if checker == True:
            score += 1
        levelpass += 1

        add += 1

        if score == 8:
            score += 2
        elif score == 7:
            score += 1



    return score


if __name__ == "__main__":
    main()
import random

def main():
    nivel = get_level()
    acertos = 0
    for _ in range(10):
        x = generate_integer(nivel)
        y = generate_integer(nivel)
        z = x + y
        i = 0
        while i < 3:
            try:
                answer = int(input(f"{x} + {y} = "))
                if answer == z:
                    acertos += 1
                    break
                else:
                    raise ValueError
            except ValueError:
                print("EEE")
                i += 1
                if i == 3:
                    print(f"{x} + {y} = {z}")

    print(f"Score: {acertos}")

def get_level():
    while True:
        try:
            level = int(input("Level: "))
            if level not in [1,2,3]:
                raise ValueError
            return level
        except ValueError:
            pass

def generate_integer(level):
        if level == 1:
            aleato = random.choice(list(range(10**level)))
            return aleato
        else:
            aleato = random.choice(list(range(10**(level-1), 10**level)))
            return aleato

if __name__ == "__main__":
    main()
