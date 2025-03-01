
import random




while True:
    try:

        lvl = int(input("Level: "))
        if lvl >= 1:
            break
        else:
           continue

    except ValueError:
        continue

nums = random.randint(1, lvl)


while True:
    try:
        guess = int(input("Guess: "))



    except:
        pass



    if nums == guess:
        print("Just right!")

    elif guess > nums:
         print("Too large!")

    elif nums < guess:
        print("Too small!")








