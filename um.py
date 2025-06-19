import re
import sys


def main():
    print(count(input("Text: ")))
    sys.exit()


def count(s):


    bounce = re.findall(r"[a-z]*\bum|Um|UM|uM\b[a-z]*", s, re.IGNORECASE)

    um = bounce.count('um')
    Um = bounce.count('Um')
    uM =  bounce.count('uM')



    um = int(um)
    Um = int(Um)
    uM = int(uM)


    return um + Um + uM




if __name__ == "__main__":
    main()
