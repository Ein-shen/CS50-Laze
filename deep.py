

def main():
    uni = earth(input("What is the answer of the Questiion of Life, The universe, and Everything "))
    print(f"  {uni}")

def earth (u):
    if  u == "42":
        post = "Yes"
    elif u  == "forty two":
        post = "Yes"
    elif u == "forty-two":
        post = "Yes"
    else:
        post = "No"

    return post


if __name__ == "__main__":

    main()
