import csv
import sys



def main():

    # printing the functions
    p = condition_checker(sys.argv[1])
    print(p)

    s = Creates_new_csv_file(sys.argv[2])
    print(s)





def condition_checker(p):

    before_csv = sys.argv[1]
    after_csv = sys.argv[2]

    # if before_csv.endswith(".csv") or not after_csv.endswith(".csv"):
    #    Creates_new_csv_file(sys.argv[2])


    # the conditions
    if len(sys.argv) < 3:
        sys.exit("Too few command-line arguments")
    elif  len(sys.argv) > 3:
        sys.exit("Too many command-line arguments")

    elif not before_csv.endswith(".csv") or not after_csv.endswith(".csv"):
        sys.exit("Could not read invalid_file.csv")

    return (f"horaay it reads and rewite the {p}")





def Creates_new_csv_file(after_csv_file):

    # reading, rewritnig, and making a new file
    before_csv = sys.argv[1]

    try:
        with open(before_csv, "r") as before, open(after_csv_file, "w", newline='') as after:
            reader = csv.DictReader(before)
            writer = csv.DictWriter(after, fieldnames=["first", "last", "house"])
            writer.writeheader()

            for row in reader:
                name = row["name"].split(",")
                last = name[0].strip()
                first = name[1].strip()
                house = row["house"]
                writer.writerow({"first": first, "last": last, "house": house})

        return (f"horayy it worked and created {after_csv_file}")

    except FileNotFoundError:
        sys.exit("diko ma find ang file sad:(")



if __name__ == "__main__":
    main()
