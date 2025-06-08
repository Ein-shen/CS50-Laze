import re
import sys


def main():
    print(validate(input("IPv4 Address: ")))
    sys.exit()



def validate(ip):
        match =  re.search(r"^\d+\.\d+\.\d\.\d+$", ip)
        if match:
                goo = ip.split(".")
                for i in goo:
                    j = int(i)
                    if j  < 0 or j > 255:
                        return False
            return True
        # else:
        #      return False




















if __name__ == "__main__":
    main()
