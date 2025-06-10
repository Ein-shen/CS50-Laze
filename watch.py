import re
import sys


def main():
    print(parse(input("HTML: ")))
    sys.exit()


def parse(s):

    shade = re.search(r'(<iframe) src="(https?://)(?:www\.)?(youtube)\.com/embed/([a-zA-Z0-9_-]+)"',s ,re.IGNORECASE)

       if s not in shade.group(2):
         return s
       if s not in shade.group(1):
         return s


    if shade:


      s = shade.group(2) + shade.group(3) + shade.group(4)

      epp = s.replace(shade.group(3), 'youtu.be/')


      return epp



#               https://youtu.be/xvFZjo5PgG0



#               <iframe src="http://www.youtube.com/embed/xvFZjo5PgG0"></iframe>










if __name__ == "__main__":
    main()
