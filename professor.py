import random


def main():
    level = get_level(level)
    score = 0

    for _ in range(10):
        x = generate_integer(level)
        y = generate_integer(level)
        retrying = 0

        while retrying < 3:
            try:
                level = int(input(f"{x} + {y} = "))
            except ValueError:
                print("EEE")
                retrying += 1
                continue

            if level == x + y:
                score += 1
                break
            else:
                print("EEE")
                retrying += 1

        if retrying == 3:
            print(f"{x} + {y} = {x + y}")

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
        return random.randint(0, 9)
     elif level == 2:
        return random.randint(10, 99)
     else:
        return random.randint(100, 999)







if __name__ == "__main__":
    main()
