

def main():
    uni = earth(input("What is the answer of the Questiion of Life, The universe, and Everything ")).casefold().strip()
    print(f"  {uni}")

def earth (u):

    if  u.strip() == "42".strip():
        post = "Yes"
    elif u.casefold()  == "forty two".casefold():
        post = "Yes"
    elif u.casefold() == "forty-two".casefold():
        post = "Yes"
    else:
        post = "No"

    return post.casefold().strip()


if __name__ == "__main__":

    main()
