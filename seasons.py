from datetime import date
import sys
import inflect
import operator

def main():
    print(birth(input("Date of Birth: ")))
    sys.exit()







def birth(bday):

    if bday is not date(2002, 12, 4).isoformat():
        sys.exit("super mali brother")

    







#    p = inflect.engine()








if __name__ == "__main__":
    main()
