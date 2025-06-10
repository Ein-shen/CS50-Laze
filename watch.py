import re
import sys


def main():
    print(parse(input("HTML: ")))
    sys.exit()


def parse(s):

    shade = re.search(r'src="(https?://)(?:www\.)?(youtube)\.com/embed/([a-zA-Z0-9_-]+)"',s ,re.IGNORECASE)
    if shade:




      s = shade.group(1) + shade.group(2) + shade.group(3)

      epp = s.replace(shade.group(2), 'youtu.be/')


      return epp



#               https://youtu.be/xvFZjo5PgG0



#               <iframe src="http://www.youtube.com/embed/xvFZjo5PgG0"></iframe>










if __name__ == "__main__":
    main()
