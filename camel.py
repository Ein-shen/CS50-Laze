
def main():
    s = input("camelCase: ")
    print("snake_case:", snake_case(s))



def snake_case(v):
    change = ""
    for _ in v:
        if _.isupper():
            change += "_" + _.lower()
        else:
            change += _

    return change


main()

 