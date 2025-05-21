import sys

def main():

   printing_press = file_open_reader(sys.argv[1])
   print(printing_press)


   if len(sys.argv) < 2:
      sys.exit("Too few command-line arguments")
   elif len(sys.argv) > 2:
      sys.exit("Too many command-line arguments")

   if not sys.argv[1].endswith(".py"):
      sys.exit("Not a Python file")



def file_open_reader(file):

   counting_lines = 0
   try:

      file_reader = open(file, 'r')


      for reading_lines in file_reader:

                  if not reading_lines.strip():
                     continue
                  else:
                     sentence = reading_lines.strip()
                     if not sentence.startswith('#'):
                        counting_lines += 1


   except FileNotFoundError:
      sys.exit("File does not exist")

   return counting_lines



if __name__ == "__main__":
   main()
