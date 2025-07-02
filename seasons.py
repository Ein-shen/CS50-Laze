from datetime import date
import sys
import inflect
import operator

p = inflect.engine()


def main():
    print(birth(input("Date of Birth: ")))
    sys.exit()





def birth(bday):

    if bday is not date(2002, 12, 4).isoformat():
        sys.exit()

    brthdy = date.isoformat(bday)
    current_day = date.today()
    adlaw = operator.sub(brthdy, current_day)
    kantidad = p.number_to_words(adlaw.days*24*60, andword="")
    return(kantidad)
















if __name__ == "__main__":
    main()
