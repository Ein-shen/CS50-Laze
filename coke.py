
due_amount = 50

while due_amount > 0:
    print("Amount Due:", due_amount)
    scent = int(input("Insert Coin: "))

    if scent == 10 or scent == 5 or scent == 25:
        due_amount -= scent

change_owed = abs(due_amount)

print("Change Owed: ", change_owed)
