import sys
from validator_collection import checkers
import validators


def main():



     print(validation(input("What's your email address? ")))







def validation(email):

    exp = r"^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"


    if exp:
        validators.email( email)
        return ("valid")

    else:
        return ("Invalid")






if __name__ == "__main__":
    main()
