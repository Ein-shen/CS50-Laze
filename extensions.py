



def main():
        fil = hush(input("File name: ")).casefold().strip()
        print(f" {fil}")


def hush(x):
        x = x.casefold().strip()

        if  x.endswith(".jpg"):
            utop = "image/jpeg"
        elif x.endswith (".pdf"):
            utop = "application/pdf"
        elif x.endswith (".gif"):
            utop = "image/gif"
        elif x.endswith (".jpeg"):
            utop = "image/jpeg"
        elif x.endswith (".png"):
            utop = "image/png"
        elif x.endswith (".txt"):
            utop = "text/plain"
        elif x.endswith (".zip"):
            utop = "application/zip"
        else:
            utop = "invalid"

        return utop

if __name__ == "__main__":
    main()
