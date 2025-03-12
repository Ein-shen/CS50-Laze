import random

def main():
    level = get_level()
    score = 0

    for _ in range(10):
        X = generate_integer(level)
        Y = generate_integer(level)
        tries = 0

        while tries < 3:
            try:
                answer = int(input(f"{X} + {Y} = "))
            except ValueError:
                print("EEE")
                tries += 1
                continue

            if answer == X + Y:
                score += 1
                break
            else:
                print("EEE")
                tries += 1

        if tries == 3:
            print(f"{X} + {Y} = {X + Y}")

    print("Score:", score)

def get_level():
    while True:
        try:
            level = int(input("Level: "))
            if level in [1, 2, 3]:
                return level
            else:
                print("Please choose a valid level (1, 2, or 3).")
        except ValueError:
            print("Invalid input. Please enter a number.")

def generate_integer(level):
    if level == 1:
        return random.randint(0, 9)
    elif level == 2:
        return random.randint(10, 99)
    elif level == 3:
        return random.randint(100, 999)

if __name__ == "__main__":
    main()
