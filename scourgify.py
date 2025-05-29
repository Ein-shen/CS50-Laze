import csv
import sys



def main():




    if len(sys.argv) == 3:

        if sys.argv[2] == "before.csv":
         print(Creates_new_csv_file(sys.argv[3]))

    p = condition_checker()
    print(p)



def condition_checker():

    if len(sys.argv) < 2:
        sys.exit("Too few command-line arguments")
    elif len(sys.argv[2]) == "before.csv":
        return
    elif  len(sys.argv) > 3:
        sys.exit("Too many command-line arguments")
    # elif len(sys.argv) > 2:
    #     sys.exit("Could not read invalid_file.csv")




def Creates_new_csv_file(after_csv_file):


       with open('before.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            print(row['first'], row['last'])


        with open( after_csv_file, 'w', newline='') as csvfile:
            fieldnames = ['first', 'last', 'house']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()


            with open(after_csv_file , newline='') as f:
                reader = csv.reader(f)
                for row in reader:
                    print(row)


            with open(after_csv_file) as file:
                for line in file:
                    row = line.rstrip().split(",")
                    print(f"{row[0]} is in {row[1]}")


            after_csv_file = sys.argv[2]

            return after_csv_file
        sys.exit(1)

if __name__ == "__main__":
    main()
