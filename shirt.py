import sys
from PIL import Image
from os.path import splitext



def main():

 
#   len_cheker()
#   splitext_checker()



def len_cheker():

   if len(sys.argv) < 2:
         sys.exit("Too few command-line arguments")

   if len(sys.argv) > 3:
         sys.exit("Too many command-line arguments")


def splitext_checker():

   endswith_extensions = (".png", ".jepg",  ".jpg")

   lib_0 = splitext(sys.argv[1])
   lib_1 = splitext(sys.argv[2])

   if lib_0[1] not in endswith_extensions :
      sys.exit("Invalid output")

   if lib_1[1] not in endswith_extensions:
      sys.exit("Invalid output")

   if lib_0[1].lower()  != lib_1[1].lower():
         sys.exit("Input and output have different extensions")












def photo_manipulation():
  shirt = Image.open("shirt.png")
  size = shirt.size
  sys.argv[2].paste(shirt, size)









if __name__ == "__main__":
   main()
