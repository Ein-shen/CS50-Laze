import sys
from validator_collection import validators



def main():

     print(validation(input("What's your email address? ")))

def validation(email):

        if email:
            validators.email( email)
            return ("valid")
        else:
            return ("Invalid")











if __name__ == "__main__":
    main()
