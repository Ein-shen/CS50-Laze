import sys
from PIL import Image
from PIL import ImageOps
from os.path import splitext



def main():

  #the functions
  len_cheker()
  splitext_checker()
  photo_manipulation()


#len_argvchecker
def len_cheker():

   #condtion if less input
   if len(sys.argv) < 2:
         sys.exit("Too few command-line arguments")

   #condtion if too much input
   if len(sys.argv) > 3:
         sys.exit("Too many command-line arguments")


#len_split_chceker
def splitext_checker():

   #list of edswith
   endswith_extensions = (".png", ".jepg",  ".jpg")

   #spliting the into 2
   lib_0 = splitext(sys.argv[1])
   lib_1 = splitext(sys.argv[2])


   # condtion of sysargv1 with based list
   if lib_0[1] not in endswith_extensions :
      sys.exit("Invalid output")

   # condtion of sysargv2 with based list
   if lib_1[1] not in endswith_extensions:
      sys.exit("Invalid output")


   #condtion of both but diff endswith
   if lib_0[1].lower()  != lib_1[1].lower():
         sys.exit("Input and output have different extensions")



#manipulation of photo resize and paste
def photo_manipulation():


  try:

      #open before.jpg
      beforeImg = Image.open(sys.argv[1])

      #open shirt png
      clothe = Image.open("shirt.png")

      #resize the shirt png
      size = clothe.size

      # fitting the muppet image to shirt png
      clownImg = ImageOps.fit(beforeImg, size)

      # pasting the shirt png to muppet
      clownImg.paste(clothe,  clothe)

      #saving the output
      clownImg.save(sys.argv[2])

  except FileNotFoundError:
      sys.exit("Input does not exist")










if __name__ == "__main__":
   main()
