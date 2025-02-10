



fruits = []


while True:
    try:
        item = input().upper()
        fruits.append(item)
    except EOFError:
        set = sorted(set(fruits))
        if item in set:
            print(fruits.count(item), item)

