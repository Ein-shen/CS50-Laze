
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
        if guess >= 1:
            break
        else:
            continue

    except ValueError:
        continue



if nums < guess:
  print("Too small!")
elif guess > nums:
  print("Too large!")
else:
    print("Just rigth!")







