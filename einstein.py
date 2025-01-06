


def main():

 v = int(input("M: "))

 v = int(v)
 if v == 1:
    convert = 90000000000000000
 elif v == 14:
    convert = 1260000000000000000
 elif v == 50:
    convert = 4500000000000000000
 else:
    convert = "invalid"

 v = int(convert)


 print("E:", convert)


main()
