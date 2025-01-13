


def main():
    clock = input("What time is it? ")
    time = convert(clock)

    if time >= 7 and time <= 8:
        print("break fast")
    elif time >= 12 and time <= 13:
        print("lunch time")
    elif time >= 18 and time <= 19:
        print("dinner time")
    else:
         print("starve")




def convert(time):
    hours, minutes = time.split(":")


    f_minutes = float(minutes) / 60
    return float(hours) + f_minutes






if __name__ == "__main__":
    main()
