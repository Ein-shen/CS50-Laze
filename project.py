import random


print("\n\n`````````````````````````````````````````````````")
print("\n      🔮 Welcome  to Past life generator! 🪄     \n")
print("``````````````````````````````````````````````````\n\n")

def main():
    f_name()
    stat  = past_status()

    while True:
        try:
            yuh = input("* Enter your name: ").capitalize()
            f_name(yuh)
            break

        except ValueError:
            print("Invalid name 😊")

    while True:
        try:
                age = int(input("* Enter age: "))
                old(age)
                break

        except ValueError:
            print("Ivalid age😊")

    while True:
        try:
            hob = input("* Enter your hobby: ").capitalize()
            questions(hob)
            break

        except ValueError:
            print("Ivalid Hobby😊")


    print("\n\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("\n         ✨ Users Information ✨         ")
    print(f"\n* Your Name: {yuh}")
    print(f"\n* Your Age: {old(age)}")
    print(f"\n* Your Hobby: {questions(hob)}")
    print("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n")

    print("\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("\n            💫 GENERATED PAST 💫          ")
    print(f"\n{f_name(yuh)}, {stat}.\n")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n")

def f_name(ayos="name"):


           if ayos.isdigit():
            raise ValueError

           elif len(ayos) < 3 or len(ayos) > 8:
                raise ValueError

           elif ayos== "":
                raise ValueError

           if any(char.isdigit() for char in ayos):
            raise ValueError


           else:
               return f"In your past life, {ayos}"


def past_status():

    status = ["Leader tribe",  "Emperor", "Royal Guard",
              "Quenn", "Slave", "Magician","King",
              "Villager", "Explorer", "Prince",
              "Princess", "Mermaid","Butler"]

    reign = ["405 years", "30 years", "90 years",
             "47 years", "23 years", "210 years",
             "55 years", "13 years", "100 years"]

    cause_of = ["Food poisoning", "Plauge", "Old age",
                "Heart attack", "Public execusion",
                "assasination", "ambushed", "War",
                "torture"]

    ran =  random.choice(status)
    lives = random.choice(reign)
    di = random.choice(cause_of)

    return f"you were a {ran}.\nyou lived {lives} and your cause of death is {di}"

def questions(hob="Hobby"):

            if len(hob) < 3 or len(hob) > 14:
                raise ValueError

            elif hob.isdigit():
                raise ValueError

            else:
                return hob

def old(age="age"):

            if int(age) < 1 or int(age) > 100:
                raise ValueError

            else:
                 return age

if __name__ == "__main__":
    main()
