



def main():

    due_amount = 50
    add_scent = 0






    while due_amount > 0:
        scent = int(input("Insert Coin: "))
        print("Amount Due:", due_amount)


        if scent == 10 or scent == 5 or scent == 25:
            due_amount -= scent

        print("Change Owed:", abs(due_amount))





if __name__ == "__main__":
    main()
