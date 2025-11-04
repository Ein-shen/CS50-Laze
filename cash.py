

def main():

    while True:
        try:
            cash = float(input("Change: "))

            if cash <= -1:
                continue

            scent = cash * 100
            coins = 0

            while scent >= 25:
                scent -= 25
                coins += 1

            while scent >= 10:
                scent -= 10
                coins += 1

            while scent >= 5:
                scent -= 5
                coins += 1

            while scent >= 1:
                scent -= 1
                coins += 1

            print(coins)
            break

        except ValueError:
            print("Not Float")


if __name__ == "__main__":
    main()
