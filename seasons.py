from datetime import date
import sys
import inflect
import operator

p = inflect.engine()


def main():



    bday = input("Date of Birth: ")
    print(birth(bday).capitalize() + "minutes")



def birth(bday):
     try:

         bday = date(1995, 1, 1)
         bday.isoformat()
         current_day = date.today()
         adlaw = operator.sub(current_day, bday)
         pinal = adlaw
         kantidad = p.number_to_words(pinal.days*24*60, andword="")
         return(kantidad)

     except ValueError:
         sys.exit()





if __name__ == "__main__":
    main()

