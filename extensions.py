



def main():
        fil = hush(input("File name: ")).casefold().strip()
        print(f" {fil}")


def hush(x):
        x = x.casefold().strip()

        if  x.endswith(".jpg"):
            utop = "image/jpeg"
        elif x.endswith (".pdf"):
            utop = "application/pdf"
        else:
            utop = "invalid"

        return utop

if __name__ == "__main__":
    main()
