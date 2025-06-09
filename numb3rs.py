import re
import sys


def main():
    #calling/ input / and printing the output
    print(validate(input("IPv4 Address: ")))
    sys.exit()


#validate Ip address
def validate(ip):
        #my regular expression
        match = re.search(r"^\d+\.\d+\.\d+\.\d+$", ip)
        if match:
                #spliting the ip by dot
                goo = ip.split(".")
                # looping the the variable goo
                for i in goo:
                    #convert the i
                   convert_int = int(i)
                  #if condition range 0-255
                   if convert_int < 0 or convert_int > 255:
                        return False
                return True
        else:
            return False





















if __name__ == "__main__":
    main()
