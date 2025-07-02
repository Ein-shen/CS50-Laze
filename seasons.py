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

         bday = date(1, 1, 1995)
         bday.isoformat()
         current_day = date.today()
         adlaw = operator.sub(current_day, bday)
         print(adlaw)
         kalahian = p.number_to_words(adlaw.days*24*60, andword="")
         return(kalahian)

     except ValueError:
         sys.exit()





if __name__ == "__main__":
    main()

