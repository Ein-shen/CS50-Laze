
import random




nums = (1, 1000)

while True:
    try:

        lvl = int(input("Level: "))
        if lvl >= 1:
            break
        elif lvl != nums:
            continue

    except ValueError:
        continue

while True:
    try:
        guess = int(input("Guess: "))
        if guess >= 1:
            break
        elif guess != nums:
            continue

    except ValueError:
        continue


if 1 <= lvl <= 1000 and 1 <= guess <= 1000:
 print("Just right!")









