import sys

def main():
   #extracting the file_open_reader
   printing_press = file_open_reader(sys.argv[1])

   #printing out the outcome
   print(printing_press)




   #len argv condition <3
   if len(sys.argv) < 2:
      sys.exit("Too few command-line arguments")
   elif len(sys.argv) > 2:
      sys.exit("Too many command-line arguments")

   if not sys.argv[1].endswith(".py"):
      sys.exit("Not a Python file")


#file reader func <3
def file_open_reader(file):

   #smount of lines in the file
   counting_lines = 0

   #try block <3
   try:

      #file reader
      file_reader = open(file, 'r')
      for reading_lines in file_reader:

                  #file condition
                  if not reading_lines.strip():
                     continue
                  else:
                     sentence = reading_lines.strip()
                     if not sentence.startswith('#'):
                        counting_lines += 1

   #except block
   except FileNotFoundError:
      sys.exit("File does not exist")

   return counting_lines



if __name__ == "__main__":
   main()
