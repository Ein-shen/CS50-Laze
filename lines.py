import sys

def main():

   if len(sys.argv) < 2:
      sys.exit("Too few command-line arguments")
   elif len(sys.argv) > 2:
      sys.exit("Too many command-line arguments")
   else:
      not sys.argv[1].endswith(".py")
      sys.exit("Not a Python file")



def file_open_reader(file):
   try:

      file_reader = open(sys.argv[1], 'r')
      reading_lines = file_reader()
      print(reading_lines)

      for reading_lines in file:
            if not reading_lines.strip():
                continue
            else:
                state = reading_lines.strip()
                if not state.startswith('#'):
                    count += 1





   except FileNotFoundError:
      sys.exit("File does not exist")





if __name__ == "__main__":
   main()
