import re
import sys


def main():
    print(count(input("Text: ")))
    sys.exit()


def count(s):


    bounce = re.findall(r"[a-z]*\bum\b[a-z]*", s, re.IGNORECASE)

    um = bounce.count('um')

    um = int(um)


    return um




if __name__ == "__main__":
    main()
