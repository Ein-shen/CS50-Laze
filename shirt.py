import csv
import sys
from PIL import Image



def main():

  op = len_of_SysArgv_condition()
  print(op)






def len_of_SysArgv_condition():

   endswith_extensions = (".png" ".jepg"  ".jpg")
   if not sys.argv[1].endswith(endswith_extensions) and not sys.argv[2].endswith(endswith_extensions):
      sys.exit("Invalid output")

   if sys.argv[1] != sys.argv[2]:
      sys.exit("Input and output have different extensions")





   if len(sys.argv) < 3:
      sys.exit("Too few command-line arguments")

   elif len(sys.argv) > 3:
      sys.exit("Too many command-line arguments")







# def photo_manipulation():
#   shirt = Image.open("shirt.png")
#   size = shirt.size
#   photo.paste(shirt, shirt)







if __name__ == "__main__":
   main()
