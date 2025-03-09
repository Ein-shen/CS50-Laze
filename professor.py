import random


def main():
    level = get_level()
    score = printing_score(level)

    print("Score:", score)


def get_level():
    while True:
        try:
            level = int(input("Level: "))
            if level < 0:
                continue
            if level == 1 or level == 2 or level == 3:
                break

        except (ValueError, UnboundLocalError):
            pass

    return level


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
    return x , y

def adding (x, y, level):
    retrying = 1
    while retrying < 3:
        try:

            for add in range(8):
                x, y = generate_integer(level)
                add = int(input(f"{x} + {y} = "))
                if add == (x + y) in range (8):
                    print(x + y)
                else:
                    retrying += 1
                    print("EEE")
        except TypeError:
            retrying += 1
            print("EEE")

        return True

def printing_score(level):
    levelpass = 1
    score = 0
    while levelpass <= 8:
        x, y = generate_integer(level)
        checker = adding(x, y, level)
        if checker == True:
            score += 1
            levelpass += 1
        else:
            continue
        return score


if __name__ == "__main__":
    main()
