def main():
        b = coin(input("Greetings: "))
        print(f"  {b}")

def coin (i):

        make = i.casefold().strip()

        if make in ["hello", "hello, newman" , "hello there"]:
            cas = "$0"
        elif make in ["how you doing?", "hey"]:
            cas = "$20"
        elif make in ["what's happening?", "what's up?"]:
            cas = "$100"
        else:
            cas = "invalid input"

        return cas

if __name__ == "__main__":

    main()
