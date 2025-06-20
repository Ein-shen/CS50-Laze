from validator_collection import validators



def main():

     reg = validation(input("What's your email address? "))
     print(reg)

def validation(email):

    try:
        if email:
            validators.email( email)
            return ("Valid")
    except:
            return ("Invalid")











if __name__ == "__main__":
    main()
