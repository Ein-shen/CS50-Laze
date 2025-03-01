
import random

while True:
    try:

        lvl = int(input("Level: "))
        if lvl >= 1:
            break


    except ValueError:
        pass

ran_num = random.randint(1, lvl)

while True:
    try:
        guess = int(input("Guess: "))
        if guess < 1 or guess > lvl:
         continue


        if guess > ran_num:
            print("Too large!")
        
        elif guess < ran_num:
             print("Too small!")

        else:
             print("Just right!")
             break


    except ValueError:
       pass














