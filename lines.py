import sys

def main():

   if len(sys.argv) < 2:
      sys.exit("Too few command-line arguments")
   elif len(sys.argv) > 2:
      sys.exit("Too many command-line arguments")
   else:
      not sys.argv[1].endswith(".py")
      sys.exit("Not a Python file")

# def file_open_reader():



if __name__ == "__main__":
   main()
