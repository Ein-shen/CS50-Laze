
def main():
    try:
        while True:
            num = int(input("Height: "))

            if num < 1:
                continue
            if num > 8:
                continue

            if num > 1:
                for i in range(1, num + 1):
                    print()
                    for l in range( num - i):
                        print(" ", end="")
                    for j in range( i):
                        print(end="" "#")
            break
        print()

    except ValueError:
        print("Not Numeric")






if __name__ == "__main__":
    main()
