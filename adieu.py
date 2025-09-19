import inflect


p = inflect.engine()


def main():


  namelist = []

  while True:
    try:

        name = input("Name: ").capitalize()
        namelist.append(name)
        joining = p.join(namelist)

    except EOFError:
        print(f"Adieu, adieu, to", joining)
        break


if __name__ == "__main__":
    main()











