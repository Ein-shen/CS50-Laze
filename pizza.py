import sys
import csv
from tabulate import tabulate
def main():

      menu_regular_sicilian = open_regular_menu()
      print(menu_regular_sicilian)





      if len(sys.argv) < 2:
            sys.exit("Too few command-line arguments")

      elif len(sys.argv) > 2:
            sys.exit("Too many command-line arguments")

      if not sys.argv[1].endswith(".csv"):
            sys.exit("Not a CSV file")

def open_regular_menu():

     try:

      if sys.argv[1] == "regular.csv":
            with open("regular.csv", 'r') as file:
                  reg = csv.reader(file)

                  return tabulate(reg)

      if sys.argv[1] == "sicilian.csv":
            with open("sicilian.csv", 'r') as file:
                  sic = csv.reader(file)

                  return tabulate(sic)

     except FileNotFoundError:
      sys.exit("File does not exist")



if __name__ == "__main__":
   main()
