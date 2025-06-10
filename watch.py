import re
import sys


def main():
    print(parse(input("HTML: ")))
    sys.exit()


def parse(s):
    # my regular expression and my pattern
    shade = re.search(r' src="(https?://)(?:www\.)?(youtube)\.com/embed/([a-zA-Z0-9_-]+)"',s ,re.IGNORECASE)
    # condition
    if shade:

      #   grouping up
      s =  shade.group(2) + shade.group(3)
      #replacing the group2
      epp = s.replace(shade.group(2), 'youtu.be/')
      #assign to another var
      will = epp
      #return value
      return "https://" + will






if __name__ == "__main__":
    main()
