from datetime import date
import sys
import inflect
import operator




def main():

    bday = input("Date of Birth: ")
    print(birth(bday).capitalize() + " minutes")



def birth(bday):
         try:

            p = inflect.engine()

            bday = date.fromisoformat(bday)
            current_day = date.today()
            adlaw = operator.sub(current_day, bday)
            adlaw = current_day - bday
            kalahian = p.number_to_words(adlaw.days * 24 * 60, andword="")

            return kalahian

         except ValueError:
              exit()










if __name__ == "__main__":
    main()

