import csv
import sys
from PIL import Image



def main():

  op = len_condition()
  print(op)






def len_condition():


   if len(sys.argv) < 3:
    sys.exit("Too few command-line arguments")

   elif len(sys.argv) > 3:
     sys.exit("Too many command-line arguments")











if __name__ == "__main__":
   main()
