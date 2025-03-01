
import random




while True:
    try:

        lvl = int(input("Level: "))
        if lvl >= 1:
            break


    except ValueError:
        continue


ran_num = random.randint(1, lvl)

while True:
    try:
        guess = int(input("Guess: "))
        if guess >= 1:
          if ran_num > guess:
            print("Too small!")
            break

          else:
            print("Just right!")
            break




    except ValueError:
        continue











