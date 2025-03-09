import random


def main():
    level = get_level()
    score = calculate_score(level)
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
    return [x, y]


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


def calculate_score(level):
    score = 0
    for _ in range(10):  # Always ask 10 problems
        x = generate_integer(level)
        y = generate_integer(level)
        if adding(x, y):
            score += 1
    return score

if __name__ == "__main__":
    main()
