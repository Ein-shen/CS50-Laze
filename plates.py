


def main():
    plate = input("Plate: ")
    if is_valid(plate):
        print("Valid")
    else:
        print("Invalid")


def is_valid(s):
    valid_options = ["CS50", "ECTO88", "NRVOUS"]
    if s in valid_options:
        return True
    else:
        return False


main()

