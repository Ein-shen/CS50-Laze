



fruits = {}
while True:
    try:
        unique_items = input().upper()
    except EOFError:
        print()
        break

    if unique_items in fruits:
           fruits[unique_items] += 1
    else:
           fruits[unique_items] = 1


for unique_items in sorted(fruits.keys()):
    print(fruits[unique_items], unique_items)



