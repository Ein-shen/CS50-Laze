import random

def main():
    level = get_level()
    score = generate_integer(level)
    print("Final Score:", score)

def get_level():
    while True:
        try:
            level = int(input("Choose a level (1, 2, or 3): "))
            if level in [1, 2, 3]:
                return level
            else:
                print("EEE")
        except ValueError:
            print("EEE")

def generate_integer(level):
    score = 0

    for i in range(10):
        attempts = 0
        if level == 1:
            x = random.randint(0, 9)
            y = random.randint(0, 9)
        elif level == 2:
            x = random.randint(10, 99)
            y = random.randint(10, 99)
        else:
            x = random.randint(100, 999)
            y = random.randint(100, 999)

        while attempts < 3:
            try:
                answer = int(input(f"{x} + {y} = "))

                if answer == x + y:
                    score += 1
                    break
                else:
                    attempts += 1
                    if attempts == 3:
                        print("EEE")
                        print(f"{x} + {y} = {x + y}")
                    else:
                        print("EEE")
            except ValueError:
                attempts += 1
                print("EEE")

    return score

if _name_ == "__main__":
    main()
    
