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
    elif len(sys.argv) > 2:
        sys.exit("Could not read invalid_file.csv")




def Creates_new_csv_file(after_csv_file):

        with open( after_csv_file, 'w', newline='') as csvfile:
            fieldnames = ['first_name', 'last_name', 'house']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)


            after_csv_file = sys.argv[2]

            writer.writeheader()
            writer.writerow({'first_name': 'Boot', 'last_name': 'Terry', 'house': 'Ravenclaw'})

            return after_csv_file
        sys.exit(1)

if __name__ == "__main__":
    main()
