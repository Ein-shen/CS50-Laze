import sys
import csv
from tabulate import tabulate



def main():

      #printing the menu's
      menu_regular_sicilian = open_regular_menu()
      print(menu_regular_sicilian)


      #conditon using len
      if len(sys.argv) < 2:
            sys.exit("Too few command-line arguments")

      elif len(sys.argv) > 2:
            sys.exit("Too many command-line arguments")

      if not sys.argv[1].endswith(".csv"):
            sys.exit("Not a CSV file")

def open_regular_menu():

     #try blockkk
     try:

      #menu of regular <3
      if sys.argv[1] == "regular.csv":
            with open("regular.csv", 'r') as file:
                  reg = csv.DictReader(file)
                  rows = list(reg)
                  return (tabulate(rows, headers="keys", tablefmt="grid"))

      #menu of sicilian <3
      if sys.argv[1] == "sicilian.csv":
            with open("sicilian.csv", 'r') as file:
                  sic = csv.DictReader(file)
                  rows = list(sic)
                  return (tabulate(rows, headers="keys", tablefmt="grid"))
      sys.exit(1)


     #execpt blockkk <3
     except FileNotFoundError:
      sys.exit("File does not exist")





if __name__ == "__main__":
   main()
