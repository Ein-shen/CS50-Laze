



def main():

    due_amount = 50
    print("Amount Due:", due_amount)





    while due_amount > 0:
        scent = int(input("Insert Coin: "))


        if scent == 10 or scent == 5 or scent == 25:
            due_amount -= scent

            change_owed = abs(due_amount)
            print("Change Owed:", change_owed)







if __name__ == "__main__":
    main()
