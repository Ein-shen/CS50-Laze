import  sys
import  csv


def mian():

    if len(sys.argv) < 2:
        sys.exit("Too few command-line arguments")
    elif  len(sys.argv) > 3:
        sys.exit("Too many command-line arguments")
    elif len(sys.argv) > 2:
        sys.exit("Could not read invalid_file.csv")
