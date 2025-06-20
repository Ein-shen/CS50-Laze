import validators



def main():

     print(validation(input("What's your email address? ")))

def validation(email):

    try:
        if email:
            validators.email( email)
            return ("valid")
    except:
            return ("Invalid")











if __name__ == "__main__":
    main()
