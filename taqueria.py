



menu = {
    "Baja Taco": 4.25,
    "Burrito": 7.50,
    "Bowl": 8.50,
    "Nachos": 11.00,
    "Quesadilla": 8.50,
    "Super Burrito": 8.50,
    "Super Quesadilla": 9.50,
    "Taco": 3.00,
    "Tortilla Salad": 8.00
    }


total = 0

while True:

    try:
        item = input("Item: ").lower().strip()


        if item in menu:
            value = menu[item]
            total += value
            print(f"Total: ${total:.2f}")
            print(f"Value: ${value:.2f}")

        else:
            print("its not on the menu.")

    except EOFError:
        print("The user's isn't available in the list")
        break





