
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




while True:
    try:
        guess = int(input("Guess: "))
        if guess >= 1:
            break
        else:
           continue




    except:
        pass



nums = random.randint(1, lvl)

    if guess >= 1:
        continue

    elif guess > nums:
         print("Too large!")

    elif nums < guess:
        print("Too small!")








