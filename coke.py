def main():

    due_amount = 50
    co = 0

    while due_amount > 0:
        print("Amount Due:", due_amount)
        scent = int(input("Insert Coin: "))


        if scent == 10 or scent == 5 or scent == 25:
            due_amount -= scent

        if due_amount  <= 0:
            co -= due_amount
            print("Change Owed:", abs(co))



if __name__ == "__main__":
    main()
