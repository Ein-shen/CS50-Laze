import re
import sys


def main():
    print(count(input("Text: ")))
    sys.exit()


def count(s):


    bounce = re.findall(r"[a-z]*\bum|Um|UM|uM\b[a-z]*", s, re.IGNORECASE)

    um = bounce.count('um')
    hello = bounce.count('Um')
    hi = bounce.count('UM')
    yow =  bounce.count('uM')



    um = int(um)
    hello = int(hello)
    hi = int(hi)
    yow = int(yow)


    return um + hello + hi + yow




if __name__ == "__main__":
    main()
