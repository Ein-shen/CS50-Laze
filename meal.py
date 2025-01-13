def main():
    clock = input("What time it is? ")
    hours, minutes = clock.split(":")
    hours = float(int(hours))
    minutes = int(minutes)
    tan = convert(hours, minutes)
    print(tan)


def convert(hours, minutes):

   all = float(hours) * 60 + int(minutes)

   if 420 <= all < 480:
        return "breakfast"
   elif 720 <= all <780:
       return "lunch times"
   elif 1080 <= all <1140:
       return "dinner time"
   else:
       return "Invalid"



if __name__ == "__main__":


    main()
