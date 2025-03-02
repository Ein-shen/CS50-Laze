import random

def main():
    level = get_level()







def get_level():
    while True:
        try:
             level = int(input("Level: "))
             if level <= 0:
                continue
             if level == 1 or level == 2 or level == 3:
                    break
             else:
                 continue

        except ValueError:
            pass

        return level






def generate_integer(level):
    if level == 1:
        x = random.randint(10, 100)
        y = random.randint(10, 100)
    elif level == 2:
        x = random.randint(100, 1000)
        x = random.randint(100, 1000)
    else:
        x = random.randint(1000, 10000)
        x = random.randint(1000, 10000)

    return x, y







if __name__ == "__main__":
    main()
